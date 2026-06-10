import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportStatusDto } from './dto/update-report-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from '../auth/roles.decorator';
import { JwtPayload } from '../auth/jwt.strategy';

interface MulterFile {
  filename: string;
}

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.reportsService.findAll(+page, +limit, search, status);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findMyReports(@Request() req: { user: JwtPayload }) {
    return this.reportsService.findByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `report-${uniqueSuffix}${ext}`);
        },
      }),
      // membuat saringan format berkas (Hanya gambar)
      fileFilter: (req, file, callback) => {
        const allowedExts = /^\.(jpg|jpeg|png)$/;
        const allowedMimes = /^image\/(jpeg|png|jpg)$/;
        const ext = extname(file.originalname).toLowerCase();
        const mime = file.mimetype;

        if (allowedExts.test(ext) && allowedMimes.test(mime)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Format berkas tidak diizinkan'), false);
        }
      },
      // batasan ukuran maximal (2mb)
      limits: {
        fileSize: 2 * 1024 * 1024,
      }
    })
  )
  create(
    @Body() createReportDto: CreateReportDto,
    @Request() req: { user: JwtPayload },
    @UploadedFile() file?: MulterFile,
  ) {
    const imagePath = file
      ? `http://localhost:3000/uploads/${file.filename}`
      : '';
    return this.reportsService.create(createReportDto, req.user.id, imagePath);
  }

  @Patch(':id/status')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateReportStatusDto,
  ) {
    return this.reportsService.updateStatus(+id, dto.status);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}

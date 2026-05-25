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
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from '../auth/roles.decorator';

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
  findMyReports(@Request() req: any) {
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
    }),
  )
  create(
    @Body() createReportDto: CreateReportDto,
    @Request() req: any,
    @UploadedFile() file?: any,
  ) {
    const imagePath = file
      ? `http://localhost:3000/uploads/${file.filename}`
      : '';
    return this.reportsService.create(createReportDto, req.user.id, imagePath);
  }

  @Patch(':id/status')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.reportsService.updateStatus(+id, status);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}

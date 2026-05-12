import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getReports() {
    return this.reportsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  updateStatusReport(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.reportsService.updateStatus(id, status);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteReport(
    @Param(
      'id',
      new ParseIntPipe({
        // jika input id tidak berupa angka, maka akan melempar exceptionFactory
        exceptionFactory: () => {
          throw new BadRequestException('Params Id harus berupa angka!');
        },
      }),
    )
    id: number,
  ) {
    return this.reportsService.remove(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

type Report = {
  title: string;
  description: string;
};

const reports: Report[] = [];

@Controller('reports')
export class ReportsController {
  @Get()
  getReports() {
    return reports;
  }

  @Post()
  createReport(@Body() body: Report) {
    reports.push(body);

    return {
      success: true,
      data: body,
    };
  }

  @Delete(':index')
  deleteReport(@Param('index') index: string) {
    reports.splice(Number(index), 1);

    return {
      success: true,
    };
  }
}
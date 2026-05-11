import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }

  async remove(id: number) {
    try {
      return await this.prisma.report.delete({
        where: { id: id },
      });
    } catch (error) {
      // Jika ID tidak ditemukan,
      throw new NotFoundException(`Laporan dengan ID ${id} tidak ditemukan`);
    }
  }
}

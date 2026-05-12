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
        item: data.item,
        location: data.location,
        description: data.description,
      },
    });
  }

  async updateStatus(id: number, status: string) {
    try {
      return await this.prisma.report.update({
        where: { id },
        data: { status },
      });
    } catch (error) {
      throw new NotFoundException(`Laporan dengan ID ${id} tidak ditemukan`);
    }
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string,
  ) {
    const skip = (page - 1) * limit;
    let where: Prisma.ReportWhereInput = {};

    if (status) {
      where.status = status;
    }

    // Filter Nama Barang: Benar-benar hanya mencari di kolom 'item'
    if (search) {
      where.item = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.report.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { fullName: true, email: true } } },
      }),
      this.prisma.report.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findByUser(userId: number) {
    return this.prisma.report.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: { user: { select: { fullName: true, email: true } } },
    });
    if (!report)
      throw new NotFoundException(`Laporan ID ${id} tidak ditemukan`);
    return report;
  }

  async create(data: CreateReportDto, userId?: number, imagePath: string = '') {
    return this.prisma.report.create({
      data: {
        item: data.item,
        location: data.location,
        description: data.description,
        image: imagePath,
        userId: userId || null,
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
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Laporan dengan ID ${id} tidak ditemukan`);
    }
  }
}

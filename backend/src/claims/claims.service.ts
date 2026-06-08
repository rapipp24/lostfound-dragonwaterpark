import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Injectable()
export class ClaimsService {
  constructor(private prisma: PrismaService) {}

  async create(createClaimDto: CreateClaimDto, userId?: number) {
    const report = await this.prisma.report.findUnique({
      where: { id: createClaimDto.reportId },
    });

    if (!report) {
      throw new NotFoundException('Barang tidak ditemukan');
    }

    return this.prisma.claim.create({
      data: {
        claimerName: createClaimDto.claimerName,
        claimerPhone: createClaimDto.claimerPhone,
        reportId: createClaimDto.reportId,
        userId: userId || null,
      },
      include: {
        report: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.claim.findMany({
        skip,
        take: limit,
        include: {
          report: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.claim.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      }
    };
  }

  async updateStatus(id: number, status: string) {
    const claim = await this.prisma.claim.findUnique({
      where: { id },
    });

    if (!claim) {
      throw new NotFoundException('Klaim tidak ditemukan');
    }

    if (status === 'Approved') {
      await this.prisma.report.update({
        where: { id: claim.reportId },
        data: { status: 'Claimed' },
      });
    }

    return this.prisma.claim.update({
      where: { id },
      data: { status },
    });
  }
}

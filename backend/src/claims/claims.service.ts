import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Injectable()
export class ClaimsService {
  constructor(private prisma: PrismaService) {}

  async create(createClaimDto: CreateClaimDto) {
    // Cek apakah barang ada
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
      },
      include: {
        report: true,
      },
    });
  }

  async findAll() {
    return this.prisma.claim.findMany({
      include: {
        report: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateStatus(id: number, status: string) {
    const claim = await this.prisma.claim.findUnique({
      where: { id },
    });

    if (!claim) {
      throw new NotFoundException('Klaim tidak ditemukan');
    }

    // Jika disetujui (Approved), ubah status barang di Report menjadi "Claimed"
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

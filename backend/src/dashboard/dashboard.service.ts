import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    // Kembalikan objek tiruan awal agar tidak terjadi eror kompilasi
    return {
      totalReports: 0,
      totalClaims: 0,
      pendingClaims: 0,
      claimedReports: 0,
    };
  }
}

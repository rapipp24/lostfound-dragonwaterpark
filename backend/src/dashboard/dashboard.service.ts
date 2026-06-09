import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const [
      totalReports,
      totalClaims,
      pendingClaims,
      claimedReports,
      approvedClaims,
      rejectedClaims,
      foundReports,
      pendingReports,
    ] = await Promise.all([
      this.prisma.report.count(),
      this.prisma.claim.count(),
      this.prisma.claim.count({ where: { status: 'Pending' } }),
      this.prisma.report.count({ where: { status: 'Claimed' } }),
      this.prisma.claim.count({ where: { status: 'Approved' } }),
      this.prisma.claim.count({ where: { status: 'Rejected' } }),
      this.prisma.report.count({ where: { status: 'Found' } }),
      this.prisma.report.count({ where: { status: 'Pending' } }),
    ]);

    return {
      totalReports,
      totalClaims,
      pendingClaims,
      claimedReports,
      approvedClaims,
      rejectedClaims,
      foundReports,
      pendingReports,
    };
  }
}

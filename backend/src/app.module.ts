import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ReportsModule } from './reports/reports.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ReportsModule, ClaimsModule],
})
export class AppModule {}

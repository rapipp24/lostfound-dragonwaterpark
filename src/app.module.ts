import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReportModule } from './modules/report/report.module';
import { ClaimModule } from './modules/claim/claim.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, AuthModule, ReportModule, ClaimModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

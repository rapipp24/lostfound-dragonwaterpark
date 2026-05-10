import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [AuthModule, UserModule, ReportsModule],
})
export class AppModule {}

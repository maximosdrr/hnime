import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { AdminService } from './admin.service';
import { AdminRepo } from './repositories/admin/admin.repository';

@Module({
  providers: [AdminService, AdminRepo],
  imports: [TypeOrmModule.forFeature([Admin])],
  exports: [AdminService],
})
export class AdminModule {}

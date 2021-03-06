import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepo } from './repositories/user/user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepo],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}

import { Injectable } from '@nestjs/common';
import { Admin } from 'src/entities/admin.entity';
import { AdminRepo } from './repositories/admin/admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepo: AdminRepo) {}

  insert(admin: Admin): Promise<Admin> {
    return this.adminRepo.insert(admin);
  }

  login(username: string, password: string): Promise<Admin> {
    return this.adminRepo.loginWithUsernameAndPassword(username, password);
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Admin } from 'src/entities/admin.entity';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.adminService.login(username, password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createAdmin(admin: Admin): Promise<Admin> {
    return this.adminService.insert(admin);
  }
}

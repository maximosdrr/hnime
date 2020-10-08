import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Admin } from 'src/entities/admin.entity';
import { AdminAuthService } from './admin-auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('admin/login')
  async login(@Req() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Post('admin/insert')
  async createAdmin(@Body() admin: Admin): Promise<Admin> {
    return this.authService.createAdmin(admin);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/profile')
  getProfile(@Req() req) {
    return req.user;
  }
}

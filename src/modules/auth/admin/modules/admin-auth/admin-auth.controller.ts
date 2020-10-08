import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Admin } from 'src/entities/admin.entity';
import { AdminAuthService } from './admin-auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('insert')
  async createAdmin(@Body() admin: Admin): Promise<Admin> {
    return this.authService.createAdmin(admin);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}

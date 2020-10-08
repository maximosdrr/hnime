import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { AdminAccessLevelGuard } from './guards/access-level.guard';
import { JwtAdminAuthGuard } from './guards/jwt-auth.guard';
import { AdminLocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AdminLocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AdminAccessLevelGuard)
  @Post('admin/insert')
  async createAdmin(@Body() user: User): Promise<User> {
    return this.authService.createAdmin(user);
  }

  @Post('user/insert')
  async createUser(@Body() user: User): Promise<User> {
    return this.authService.createUser(user);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}

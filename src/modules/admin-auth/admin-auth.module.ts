import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { AdminAuthService } from './admin-auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { AdminAuthController } from './admin-auth.controller';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [AdminAuthService, LocalStrategy, JwtStrategy],
  controllers: [AdminAuthController],
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: factory => ({
        secret: process.env.JWT_ADMIN_SECRET,
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
})
export class AdminAuthModule {}

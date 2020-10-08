import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from '../user/user.module';
import { AdminAccessLevelGuard } from './guards/access-level.guard';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, AdminAccessLevelGuard],
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: factory => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
})
export class AdminAuthModule {}

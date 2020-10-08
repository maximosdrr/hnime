import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAccessLevelGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) return false;

    const token = request.headers.authorization.replace('Bearer ', '');
    const decoded: any = this.jwtService.decode(token);

    return decoded.accessLevel == 0;
  }
}

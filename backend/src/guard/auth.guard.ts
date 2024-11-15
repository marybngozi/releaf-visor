import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies['SESSION_IDs'];

    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token);
      request.userId = payload.userId;
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

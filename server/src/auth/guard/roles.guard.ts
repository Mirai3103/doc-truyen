import { Role } from '@/user/schema/user.schema';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WithRoleGuard extends AuthGuard('jwt') {
  constructor(private role?: Role) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    return true;
  }
  handleRequest(err: any, user: any, info: any) {
    if (!this.role) {
      return user;
    }
    if (!user) {
      throw err || new UnauthorizedException();
    }
    if (user.role < this.role) {
      throw err || new UnauthorizedException();
    }
    if (err || !user) return null;
    return user;
  }
}

import { Role } from '@/user/schema/user.schema';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WithRoleGuard extends AuthGuard('jwt') {
  constructor(private role?: Role) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    if (!this.role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }
    if (user.role < this.role) {
      return false;
    }
    return true;
  }
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) return null;
    return user;
  }
}

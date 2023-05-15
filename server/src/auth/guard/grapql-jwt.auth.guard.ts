import { Role } from '@/user/schema/user.schema';
import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class GrapqlJwtAuthGuard extends AuthGuard('jwt') {
  constructor(@Inject(AuthService) private authService: AuthService) {
    super();
  }
  canActivate(ctx: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    // get request and response
    const context = GqlExecutionContext.create(ctx);
    const req = context.getContext().req;
    return super.canActivate(new ExecutionContextHost([req]));
  }
}

@Injectable()
export class GrapqlMayBeNeedIdentityGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  canActivate(ctx: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    // get request and response
    const context = GqlExecutionContext.create(ctx);
    const req = context.getContext().req;
    return super.canActivate(new ExecutionContextHost([req]));
  }
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) return null;
    return user;
  }
}
@Injectable()
export class WithRoleGuardGQL extends GrapqlMayBeNeedIdentityGuard {
  constructor(private role?: Role) {
    super();
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

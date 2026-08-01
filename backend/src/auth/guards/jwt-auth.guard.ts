import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public-routes.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    console.log('1 - JWTAuthGuard');
    // Evaluacion del Request
    // const request = context.switchToHttp().getRequest();
    // console.log({
    //   method: request.method,
    //   url: request.url,
    //   headers: request.headers,
    //   body: request.body,
    //   query: request.query,
    //   params: request.params,
    // });

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}

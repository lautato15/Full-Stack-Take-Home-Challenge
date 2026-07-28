import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export interface AuthenticatedUser {
  email: string;
  sub: number;
}
export interface AuthenticatedUserId {
  sub: number;
}
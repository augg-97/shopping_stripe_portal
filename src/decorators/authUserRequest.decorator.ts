import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const AuthUserRequest = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<Request>();
    return user;
  },
);

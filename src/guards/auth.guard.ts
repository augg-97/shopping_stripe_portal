import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../services/tokenService/token.service';
import { Request } from 'express';
import { TokenNotProvidedException } from '../exceptions/unauthorized/tokenNotProvided.exception';
import { extractToken } from '../helpers/extractToken';
import { ACCESS_TOKEN_SERVICE } from '../helpers/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ACCESS_TOKEN_SERVICE)
    private readonly accessTokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const bearerToken = req.headers.authorization;
    const token = bearerToken && extractToken(bearerToken);
    if (token) {
      const clientId =
        req.headers['client_id'] && req.headers['client_id'].toString();
      const authUser = await this.accessTokenService.tokenVerify(
        token,
        clientId,
      );
      req.user = authUser;

      return true;
    }

    const isPublic = this.reflector.get<boolean | undefined>(
      'isPublic',
      context.getHandler(),
    );
    if (!isPublic) {
      throw new TokenNotProvidedException();
    }

    return true;
  }
}

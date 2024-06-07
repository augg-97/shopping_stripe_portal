import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { TokenService } from "../services/tokenService/token.service";
import { Request } from "express";
import { TokenNotProvidedException } from "../exceptions/unauthorized/tokenNotProvided.exception";
import { extractToken } from "../helpers/extractToken";
import { REFRESH_TOKEN_SERVICE } from "../helpers/constant";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    @Inject(REFRESH_TOKEN_SERVICE)
    private readonly refreshTokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const bearerToken =
      req.headers.refresh_token && req.headers.refresh_token.toString();
    const token = bearerToken && extractToken(bearerToken);

    if (!token) {
      throw new TokenNotProvidedException();
    }

    const clientId =
      req.headers["client_id"] && req.headers["client_id"].toString();
    const authUser = await this.refreshTokenService.tokenVerify(
      token,
      clientId,
    );
    req.user = authUser;

    return true;
  }
}

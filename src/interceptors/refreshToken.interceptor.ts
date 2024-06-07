import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { Observable, map } from "rxjs";
import { AuthUser } from "../services/tokenService/authUser";
import { TokenService } from "../services/tokenService/token.service";
import { LoggerService } from "../services/loggerService/logger.service";
import { PrismaService } from "../services/prismaService/prisma.service";
import { Request } from "express";
import { TokenConflictException } from "../exceptions/conflict/tokenConflict.exception";
import { ACCESS_TOKEN_SERVICE } from "../helpers/constant";
import { extractToken } from "../helpers/extractToken";

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(
    @Inject(ACCESS_TOKEN_SERVICE)
    private readonly accessTokenService: TokenService,
    private readonly loggerService: LoggerService,
    private readonly prismaService: PrismaService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<UserDto>,
  ): Promise<Observable<Promise<UserDto>>> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse();
    const clientId = req.headers["client_id"];

    return next.handle().pipe(
      map(async (data) => {
        try {
          const payload: AuthUser = {
            id: data.id.toString(),
            email: data.email || "",
            role: data.role,
            isVerify: data.isVerify,
          };

          const accessToken = await this.accessTokenService.tokenGenerator(
            payload,
            clientId?.toString(),
          );
          const bearerToken =
            req.headers.refresh_token && req.headers.refresh_token.toString();
          const refreshToken = bearerToken && extractToken(bearerToken);

          res.setHeader("Authorization", accessToken);
          res.setHeader("refresh_token", refreshToken);

          return data;
        } catch (error) {
          this.loggerService.error(
            "🚀 ~ AuthInterception ~ map ~ error:",
            error,
          );
          await this.prismaService.user.delete({
            where: {
              id: data.id,
            },
          });
          throw new TokenConflictException();
        }
      }),
    );
  }
}

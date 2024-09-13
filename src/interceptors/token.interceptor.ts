import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AuthUser } from '../services/tokenService/authUser';
import { TokenService } from '../services/tokenService/token.service';
import { Request } from 'express';
import { Observable, mergeMap } from 'rxjs';
import { LoggerService } from '../services/loggerService/logger.service';
import { PrismaService } from '../services/prismaService/prisma.service';
import { TokenConflictException } from '../exceptions/conflict/tokenConflict.exception';
import { UserDto } from '../dtos/user.dto';
import {
  ACCESS_TOKEN_SERVICE,
  REFRESH_TOKEN_SERVICE,
} from '../helpers/constant';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(
    @Inject(ACCESS_TOKEN_SERVICE)
    private readonly accessTokenService: TokenService,
    @Inject(REFRESH_TOKEN_SERVICE)
    private readonly refreshTokenService: TokenService,
    private readonly loggerService: LoggerService,
    private readonly prismaService: PrismaService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<UserDto>,
  ): Promise<Observable<UserDto>> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse();
    const clientId = req.headers['client_id'];

    return next.handle().pipe(
      mergeMap(async (data) => {
        try {
          const payload: AuthUser = {
            id: data.id.toString(),
            email: data.email || '',
            type: data.type,
            isVerify: data.isVerify,
            storeId: (data.store && data.store.id) || undefined,
          };

          const accessToken = await this.accessTokenService.tokenGenerator(
            payload,
            clientId?.toString(),
          );
          const refreshToken = await this.refreshTokenService.tokenGenerator(
            payload,
            clientId?.toString(),
          );

          res.setHeader('Authorization', accessToken);
          res.setHeader('refresh_token', refreshToken);

          return data;
        } catch (error) {
          this.loggerService.error(
            '🚀 ~ AuthInterception ~ map ~ error:',
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

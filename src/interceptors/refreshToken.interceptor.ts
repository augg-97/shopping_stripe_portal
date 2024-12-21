import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, mergeMap } from 'rxjs';
import { AuthUser } from '../services/tokenService/authUser';
import { TokenService } from '../services/tokenService/token.service';
import { LoggerService } from '../services/loggerService/logger.service';
import { PrismaService } from '../services/prismaService/prisma.service';
import { Request } from 'express';
import { TokenConflictException } from '../exceptions/conflict/tokenConflict.exception';
import { ACCESS_TOKEN_SERVICE } from '../helpers/constant';
import { extractToken } from '../helpers/extractToken';
import { IUserDto } from '../dtos/users/user.interface';

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
    next: CallHandler<IUserDto>,
  ): Promise<Observable<IUserDto>> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse();
    const clientId = req.headers['client_id'];

    return next.handle();
    // return next.handle().pipe(
    //   mergeMap(async (data) => {
    //     try {
    //       const payload: AuthUser = {
    //         id: data.id.toString(),
    //         email: data.email || '',
    //         type: data.type,
    //         isVerify: data.isVerify,
    //         storeId: (data.store && data.store.id) || undefined,
    //       };

    //       const accessToken = await this.accessTokenService.tokenGenerator(
    //         payload,
    //         clientId?.toString(),
    //       );
    //       const bearerToken =
    //         req.headers.refresh_token && req.headers.refresh_token.toString();
    //       const refreshToken = bearerToken && extractToken(bearerToken);

    //       res.setHeader('Authorization', accessToken);
    //       res.setHeader('refresh_token', refreshToken);

    //       return data;
    //     } catch (error) {
    //       this.loggerService.error(
    //         '🚀 ~ AuthInterception ~ map ~ error:',
    //         error,
    //       );
    //       await this.prismaService.user.delete({
    //         where: {
    //           id: data.id,
    //         },
    //       });
    //       throw new TokenConflictException();
    //     }
    //   }),
    // );
  }
}

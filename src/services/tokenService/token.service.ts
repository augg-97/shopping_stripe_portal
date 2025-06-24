import { JwtService } from '@nestjs/jwt';

import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

import { AppLoggerService } from '../appLoggerService/appLogger.service';

import { AuthUser } from './authUser';

export class TokenService {
  protected redisKey!: PREFIX_REDIS_KEY;
  protected secretKey!: string;
  protected expiration!: number;

  constructor(
    protected jwtService: JwtService,
    protected readonly logger: AppLoggerService,
  ) {}

  async tokenGenerator(payload: AuthUser): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.secretKey,
      expiresIn: this.expiration,
    });
  }

  async tokenVerify(token: string): Promise<AuthUser | null> {
    try {
      return await this.jwtService.verifyAsync<AuthUser>(token, {
        secret: this.secretKey,
      });
    } catch (error) {
      this.logger.error('🚀 ~ TokenService ~ tokenVerify ~ error', error);

      return null;
    }
  }
}

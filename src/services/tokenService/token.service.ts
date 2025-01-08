import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './authUser';
import { REDIS_KEY } from '../redisService/redisKey';
import { AppLoggerService } from '../appLoggerService/appLogger.service';

export class TokenService {
  protected redisKey!: REDIS_KEY;
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

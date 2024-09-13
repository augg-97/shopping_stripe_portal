import { Global, Module } from '@nestjs/common';
import { accessTokenService } from './accessToken.service';
import { refreshTokenService } from './refreshToken.service';
import { RedisModule } from '../redisService/redis.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [RedisModule, JwtModule],
  controllers: [],
  providers: [accessTokenService, refreshTokenService],
  exports: [accessTokenService, refreshTokenService],
})
export class TokenModule {}

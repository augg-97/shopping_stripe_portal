import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AccessTokenService } from './accessToken.service';
import { RefreshTokenService } from './refreshToken.service';

@Global()
@Module({
  imports: [JwtModule],
  controllers: [],
  providers: [AccessTokenService, RefreshTokenService],
  exports: [AccessTokenService, RefreshTokenService],
})
export class TokenModule {}

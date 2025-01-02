import { Global, Module } from '@nestjs/common';
import { AccessTokenService } from './accessToken.service';
import { RefreshTokenService } from './refreshToken.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule],
  controllers: [],
  providers: [AccessTokenService, RefreshTokenService],
  exports: [AccessTokenService, RefreshTokenService],
})
export class TokenModule {}

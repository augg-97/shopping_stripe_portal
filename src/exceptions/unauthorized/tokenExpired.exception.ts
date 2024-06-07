import { HttpException, HttpStatus } from "@nestjs/common";

export type TokenExpiredErrorCode =
  | "ACCESS_TOKEN_EXPIRED"
  | "REFRESH_TOKEN_EXPIRED";

export type TokenExpiredMessage =
  | "Access token is expired"
  | "Refresh token is expired";

export class TokenExpiredException extends HttpException {
  constructor(errorCode: TokenExpiredErrorCode, message: TokenExpiredMessage) {
    super({ errorCode, message }, HttpStatus.UNAUTHORIZED);
  }
}

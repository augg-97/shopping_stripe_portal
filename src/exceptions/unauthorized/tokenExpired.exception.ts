import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@exceptions/baseHttp.exception';

export type TokenExpiredErrorCode =
  | 'ACCESS_TOKEN_EXPIRED'
  | 'REFRESH_TOKEN_EXPIRED';

export type TokenExpiredMessage =
  | 'Access token is expired'
  | 'Refresh token is expired';

export class TokenExpiredException extends BaseHttpException {
  constructor(errorCode: TokenExpiredErrorCode, message: TokenExpiredMessage) {
    super(errorCode, message, HttpStatus.UNAUTHORIZED);
  }
}

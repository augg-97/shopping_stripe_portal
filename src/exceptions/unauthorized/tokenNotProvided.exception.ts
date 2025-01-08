import { BaseHttpException } from '@exceptions/baseHttp.exception';
import { HttpStatus } from '@nestjs/common';

export class TokenNotProvidedException extends BaseHttpException {
  constructor() {
    super('TOKEN_NOT_PROVIDED', 'Token not provided', HttpStatus.UNAUTHORIZED);
  }
}

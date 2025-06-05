import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@exceptions/baseHttp.exception';

export class TokenNotProvidedException extends BaseHttpException {
  constructor() {
    super('TOKEN_NOT_PROVIDED', 'Token not provided', HttpStatus.UNAUTHORIZED);
  }
}

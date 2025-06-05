import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@exceptions/baseHttp.exception';

export class TokenInvalidException extends BaseHttpException {
  constructor() {
    super('INVALID_TOKEN', 'Token is invalid', HttpStatus.UNAUTHORIZED);
  }
}

import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@exceptions/baseHttp.exception';

export class TokenConflictException extends BaseHttpException {
  constructor() {
    super(
      'GENERATE_TOKEN_FAIL',
      'Error while generate token',
      HttpStatus.CONFLICT,
    );
  }
}

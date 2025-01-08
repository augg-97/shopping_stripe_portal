import { BaseHttpException } from '@exceptions/baseHttp.exception';
import { HttpStatus } from '@nestjs/common';

export class TokenConflictException extends BaseHttpException {
  constructor() {
    super(
      'GENERATE_TOKEN_FAIL',
      'Error while generate token',
      HttpStatus.CONFLICT,
    );
  }
}

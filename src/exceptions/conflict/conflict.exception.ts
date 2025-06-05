import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@exceptions/baseHttp.exception';

export class ConflictException extends BaseHttpException {
  constructor(errorCode: string, message: string) {
    super(errorCode, message, HttpStatus.CONFLICT);
  }
}

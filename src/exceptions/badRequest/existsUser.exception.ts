import { BaseHttpException } from '@exceptions/baseHttp.exception';
import { HttpStatus } from '@nestjs/common';

export class ExistsUserException extends BaseHttpException {
  constructor() {
    super('USER_ALREADY_EXISTS', 'User already exists', HttpStatus.BAD_REQUEST);
  }
}

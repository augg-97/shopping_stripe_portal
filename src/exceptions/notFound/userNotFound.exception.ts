import { BaseHttpException } from '@exceptions/baseHttp.exception';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends BaseHttpException {
  constructor() {
    super('USER_NOT_FOUND', 'User is not found', HttpStatus.NOT_FOUND);
  }
}

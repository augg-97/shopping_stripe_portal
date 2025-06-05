import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@exceptions/baseHttp.exception';

export class UserNotFoundException extends BaseHttpException {
  constructor() {
    super('USER_NOT_FOUND', 'User is not found', HttpStatus.NOT_FOUND);
  }
}

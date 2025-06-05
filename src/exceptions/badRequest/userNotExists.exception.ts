import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@exceptions/baseHttp.exception';

export class UserNotExistsException extends BaseHttpException {
  constructor() {
    super('USER_NOT_EXISTS', "User doesn't exists", HttpStatus.BAD_REQUEST);
  }
}

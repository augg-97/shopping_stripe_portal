import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        errorCode: 'USER_NOT_FOUND',
        message: 'User is not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequestException extends HttpException {
  constructor(errorCode: string, message: string) {
    super({ errorCode, message }, HttpStatus.BAD_REQUEST);
  }
}

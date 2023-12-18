import { HttpException, HttpStatus } from "@nestjs/common";

export class ExistsUserException extends HttpException {
  message: string;
  constructor() {
    super("BadRequest", HttpStatus.BAD_REQUEST);
    this.message = "User is exists";
  }

  getResponse(): string | object {
    return this.message;
  }
}

import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenInvalidException extends HttpException {
  message: string;
  constructor() {
    super("TOKEN_IS_VALID", HttpStatus.BAD_REQUEST);
    this.message = "User is exists";
  }

  getResponse(): string | object {
    return this.message;
  }
}

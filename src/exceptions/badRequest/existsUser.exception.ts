import { HttpException, HttpStatus } from "@nestjs/common";

export class ExistsUserException extends HttpException {
  // message: string;
  constructor() {
    super(
      { errorCode: "USER_ALREADY_EXISTS", message: "User already exists" },
      HttpStatus.BAD_REQUEST,
    );
  }

  // getResponse(): string | object {
  //   return this.message;
  // }
}

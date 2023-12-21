import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidatorException extends HttpException {
  constructor(public message: string) {
    super({ errorCode: "BAD_REQUEST", message }, HttpStatus.BAD_REQUEST);
  }
}

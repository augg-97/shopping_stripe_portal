import { HttpException, HttpStatus } from "@nestjs/common";

export class RefreshTokenExpiredException extends HttpException {
  constructor() {
    super(
      {
        errorCode: "REFRESH_TOKEN_EXPIRED",
        message: "Refresh token is expired",
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

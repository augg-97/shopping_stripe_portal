import { HttpException, HttpStatus } from '@nestjs/common';

export class CredentialDeniedException extends HttpException {
  constructor() {
    super(
      { errorCode: 'CREDENTIAL_DENIED', message: 'Credential denied' },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

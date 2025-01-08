import { BaseHttpException } from '@exceptions/baseHttp.exception';
import { HttpStatus } from '@nestjs/common';

export class CredentialDeniedException extends BaseHttpException {
  constructor() {
    super('CREDENTIAL_DENIED', 'Credential denied', HttpStatus.UNAUTHORIZED);
  }
}

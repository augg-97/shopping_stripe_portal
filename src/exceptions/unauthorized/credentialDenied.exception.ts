import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@exceptions/baseHttp.exception';

export class CredentialDeniedException extends BaseHttpException {
  constructor() {
    super('CREDENTIAL_DENIED', 'Credential denied', HttpStatus.UNAUTHORIZED);
  }
}

import { PickType } from '@nestjs/swagger';

import { RegisterPayload } from '../register/register.payload';

export class LoginPayload extends PickType(RegisterPayload, [
  'email',
  'password',
]) {}

import { PickType } from '@nestjs/swagger';
import { RegisterPayload } from '../register/register.payload';

export class ForgotPasswordPayload extends PickType(RegisterPayload, [
  'email',
]) {}

import { ApiProperty, PickType } from '@nestjs/swagger';
import { RegisterPayload } from '../register/register.payload';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordPayload extends PickType(RegisterPayload, [
  'password',
]) {
  @ApiProperty({
    description: 'email',
    default: 'user@mock.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  email!: string;

  @ApiProperty({
    description: 'token',
    default: 'ZGFkc2Rhcw==',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  token!: string;
}

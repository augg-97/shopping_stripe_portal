import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStorePayload {
  @ApiProperty({
    description: 'fullName',
    default: 'mock user',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;
}

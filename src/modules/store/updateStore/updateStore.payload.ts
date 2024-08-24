import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStorePayload {
  @ApiProperty({
    description: 'fullName',
    default: 'mock user',
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  name?: string;
}

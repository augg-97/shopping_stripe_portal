import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProfilePayload {
  @ApiProperty({
    description: 'fullName',
    default: 'mock user',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => String)
  fullName?: string;

  @ApiProperty({
    description: 'profileImageId',
    default: '1',
    required: false,
  })
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  profileImageId?: number;

  @ApiProperty({
    description: 'coverImageId',
    default: '1',
    required: false,
  })
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  coverImageId?: number;
}

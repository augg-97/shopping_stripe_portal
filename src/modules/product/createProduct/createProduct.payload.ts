import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductPayload {
  @ApiProperty({
    description: 'name',
    default: 'mock name product',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @ApiProperty({
    description: 'description',
    default: 'mock description product',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  description: string;

  @ApiProperty({
    description: 'info',
    default: 'mock info product',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  info?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsDefined()
  @Type(() => Number)
  price: number;

  @IsInt()
  @IsNumber()
  @IsDefined()
  @Type(() => Number)
  stock: number;
}

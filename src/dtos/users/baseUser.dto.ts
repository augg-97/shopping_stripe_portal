import { USER_TYPE } from '@prisma/client';
import { Expose, Transform, Type } from 'class-transformer';

import { BaseMediaDto } from '@dtos/media/baseMedia.dto';
import { BaseDto } from '@dtos/base.dto';

export class BaseUserDto extends BaseDto {
  @Expose()
  email?: string;

  @Expose()
  fullName!: string;

  @Expose()
  @Transform(({ obj }) => obj.isVerify)
  isVerified!: boolean;

  @Expose()
  type?: USER_TYPE;

  @Expose()
  @Type(() => BaseMediaDto)
  profileImage!: BaseMediaDto | null;

  @Expose()
  @Type(() => BaseMediaDto)
  coverImage!: BaseMediaDto | null;
}

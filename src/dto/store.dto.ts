import { Store } from '@prisma/client';
import { AbstractDto } from './abstract.dto';
import { MediaDto } from './media.dto';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';

export class StoreDto extends AbstractDto implements Store {
  name: string;

  @Expose()
  @Transform((data) => plainToClass(MediaDto, data.value))
  profileImage: MediaDto | null;

  @Expose()
  @Transform((data) => plainToClass(MediaDto, data.value))
  coverImage: MediaDto | null;

  @Exclude()
  profileImageId: number | null;

  @Exclude()
  coverImageId: number | null;

  @Exclude()
  ownerId: number;
}

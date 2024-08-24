import { Media } from '@prisma/client';
import { AbstractDto } from './abstract.dto';
import { Exclude } from 'class-transformer';

export class MediaDto extends AbstractDto implements Media {
  fileName: string;
  url: string;

  @Exclude()
  productId: number | null;

  @Exclude()
  uploaderId: number;
}

import { Media } from '@prisma/client';
import { MediaDtoBuilder } from './media.builder';

export interface IMediaDto extends Pick<Media, 'fileName' | 'url'> {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMediaDtoConcrete {
  builder: MediaDtoBuilder;
  build(entity: Media): void;
}

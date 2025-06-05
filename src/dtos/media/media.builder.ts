import { Media } from '@prisma/client';

import { IMediaDto } from './media.interface';

export class MediaDtoBuilder {
  private mediaDto!: IMediaDto;

  constructor() {
    this.mediaDto = {} as IMediaDto;
  }

  setDto(media: Media): this {
    this.mediaDto = {
      ...this.mediaDto,
      id: media.id,
      fileName: media.fileName,
      url: media.url,
      createdAt: media.createdAt.toISOString(),
      updatedAt: media.updatedAt.toISOString(),
    };

    return this;
  }

  toDto(): IMediaDto {
    return { ...this.mediaDto };
  }
}

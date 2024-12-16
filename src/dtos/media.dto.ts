import { Media } from '@prisma/client';

export interface IMediaDto extends Pick<Media, 'fileName' | 'url'> {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export class MediaDtoBuilder {
  private mediaDto: IMediaDto;

  constructor() {
    this.mediaDto = <IMediaDto>{};
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
    return this.mediaDto;
  }
}

export interface IConcreteMediaDto {
  build(builder: MediaDtoBuilder): void;
}

export class ConcreteMediaDto implements IConcreteMediaDto {
  constructor(private readonly entity: Media) {}

  build(builder: MediaDtoBuilder): void {
    builder.setDto(this.entity);
  }
}

export class MediaDto {
  constructor(private readonly entity: Media) {}

  build(): IMediaDto {
    const builder = new MediaDtoBuilder();
    builder.setDto(this.entity);

    return builder.toDto();
  }
}

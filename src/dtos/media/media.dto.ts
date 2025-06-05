import { Media } from '@prisma/client';

import { MediaDtoBuilder } from './media.builder';
import { IMediaDtoConcrete } from './media.interface';

export class MediaDto implements IMediaDtoConcrete {
  readonly builder: MediaDtoBuilder;

  constructor(_builder: MediaDtoBuilder) {
    this.builder = _builder;
  }

  build(entity: Media): void {
    this.builder.setDto(entity);
  }
}

import { Media } from '@prisma/client';
import { OmitTyped } from '../../utilities/customType.utilities';
import { StoreDtoBuilder } from './store.builder';
import { StoreDto } from './store.dto';
import { IConcreteStoreDto, StoreEntity } from './store.interface';
import { IMediaDto } from '../media/media.interface';
import { MediaDtoBuilder } from '../media/media.builder';
import { MediaDto } from '../media/media.dto';

export class StoreProfileDto extends StoreDto implements IConcreteStoreDto {
  constructor(_builder: StoreDtoBuilder) {
    super(_builder);
  }

  build(store: OmitTyped<StoreEntity, 'owner'>): void {
    const storeDto = new StoreDto(this.builder);
    storeDto.build(store);

    const profileImageDto =
      store.profileImage && this.setMediaDto(store.profileImage);
    this.builder.setProfileImage(profileImageDto);
    const coverImageDto =
      store.coverImage && this.setMediaDto(store.coverImage);
    this.builder.setCoverImage(coverImageDto);
  }

  setMediaDto(media: Media): IMediaDto {
    const builder = new MediaDtoBuilder();
    const mediaDto = new MediaDto(builder);
    mediaDto.build(media);

    return builder.toDto();
  }
}

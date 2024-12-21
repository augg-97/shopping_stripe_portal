import { Media } from '@prisma/client';
import { OmitTyped } from '../../utilities/customType.utilities';
import { UserDtoBuilder } from './user.builder';
import { UserDto } from './user.dto';
import { IUserDtoConcrete, UserEntity } from './user.interface';
import { IMediaDto } from '../media/media.interface';
import { MediaDtoBuilder } from '../media/media.builder';
import { MediaDto } from '../media/media.dto';

export class UserProfileDto extends UserDto implements IUserDtoConcrete {
  constructor(_builder: UserDtoBuilder, isPrivateUser = false) {
    super(_builder, isPrivateUser);
  }

  build(user: OmitTyped<UserEntity, 'stores'>): void {
    super.build(user);

    const profileImageDto =
      user.profileImage && this.setMediaDto(user.profileImage);
    this.builder.setProfileImage(profileImageDto);
    const coverImageDto = user.coverImage && this.setMediaDto(user.coverImage);
    this.builder.setCoverImage(coverImageDto);
  }

  setMediaDto(media: Media): IMediaDto {
    const builder = new MediaDtoBuilder();
    const mediaDto = new MediaDto(builder);
    mediaDto.build(media);

    return builder.toDto();
  }
}

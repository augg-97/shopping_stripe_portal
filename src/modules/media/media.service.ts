import { Injectable } from '@nestjs/common';
import { UploadService } from '../../services/uploadService/upload.service';
import { AuthUser } from '../../services/tokenService/authUser';
import {
  MediaBulkInput,
  MediaRepository,
} from '../../repositories/media.repository';
import { MediaDtoBuilder } from '../../dtos/media/media.builder';
import { MediaDto } from '../../dtos/media/media.dto';

@Injectable()
export class MediaService {
  constructor(
    private readonly mediaRepository: MediaRepository,
    private readonly uploadService: UploadService,
  ) {}

  async uploadImages(images: Express.Multer.File[], authUser: AuthUser) {
    const updatedImages = await this.uploadService.storeImages(images);

    const imageBulkInput: MediaBulkInput[] = updatedImages.map((item) => ({
      ...item,
      uploaderId: Number(authUser.id),
    }));
    const savedImages =
      await this.mediaRepository.createBulkMedia(imageBulkInput);

    return savedImages.map((item) => {
      const builder = new MediaDtoBuilder();
      const dto = new MediaDto(builder);
      dto.build(item);

      return builder.toDto();
    });
  }
}

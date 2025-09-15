import { Injectable } from '@nestjs/common';

import {
  MediaBulkInput,
  MediaRepository,
} from '@repositories/media.repository';
import { WebServerUploadService } from '@services/uploadService/webServerUpload.service';
import { AuthUser } from '@services/tokenService/authUser';

@Injectable()
export class MediaService {
  constructor(
    private readonly mediaRepository: MediaRepository,
    private readonly webServerUploadService: WebServerUploadService,
  ) {}

  async uploadImages(images: Express.Multer.File[], authUser: AuthUser) {
    const updatedImages = await this.webServerUploadService.storeImages(images);

    const imageBulkInput: MediaBulkInput[] = updatedImages.map((item) => ({
      ...item,
      uploaderId: Number(authUser.id),
    }));
    const savedImages =
      await this.mediaRepository.createBulkMedia(imageBulkInput);

    return savedImages;
  }
}

import { extension } from 'mime-types';

import { uuidGenerator } from '@pkgs/uuidGenerator';

export class BaseUploadService {
  fileNameGenerator(image: Express.Multer.File): string {
    const uniqName = uuidGenerator();
    const fileExtension = extension(image.mimetype);

    if (!fileExtension) {
      return '';
    }

    return `${uniqName}.${fileExtension}`;
  }
}

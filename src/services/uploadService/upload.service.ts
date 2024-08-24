import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { ConfigurationService } from '../../config/configuration.service';
import { mkdir, stat } from 'fs';
import { LoggerService } from '../loggerService/logger.service';
import { uuidGenerator } from '../../pkgs/uuidGenerator';
import { writeFile } from 'fs/promises';
import { extension } from 'mime-types';

@Injectable()
export class UploadService {
  private imageDir = join(__dirname, '../../../public/assets/images');

  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly loggerService: LoggerService,
  ) {
    const isExistsDir = this.isExistsDir(this.imageDir);
    if (!isExistsDir) {
      mkdir(this.imageDir, { recursive: true }, (err) => {
        if (err) {
          this.loggerService.error(
            'Error occur when create serve static folder',
            err,
          );
        }
      });
    }
  }

  private isExistsDir(dir: string): boolean {
    let result = false;
    stat(dir, (err, stats) => {
      if (!err) {
        result = stats.isDirectory();
      }
    });

    return result;
  }

  async storeImages(images: Express.Multer.File[]) {
    try {
      return await Promise.all(
        images.map(async (item) => await this.storeImage(item)),
      );
    } catch (err) {
      this.loggerService.error('🚀 ~ UploadService ~ storeImages ~ err:', err);

      return [];
    }
  }

  async storeImage(image: Express.Multer.File): Promise<{
    fileName: string;
    url: string;
  }> {
    const fileName = this.fileNameGenerator(image);
    const filePath = `${this.imageDir}/${fileName}`;
    await writeFile(filePath, image.buffer);
    return {
      fileName,
      url: this.imageUrlGenerator(fileName),
    };
  }

  fileNameGenerator(image: Express.Multer.File) {
    const uniqName = uuidGenerator();
    const fileExtension = extension(image.mimetype);
    return `${uniqName}.${fileExtension}`;
  }

  imageUrlGenerator(fileName: string) {
    return `${this.configurationService.imageBaseUrl}${fileName}`;
  }
}

import { join } from 'path';
import { mkdir, stat } from 'fs';
import { writeFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';

import { AppConfigService } from '@appConfigs/appConfig.service';
import { AppLoggerService } from '@services/appLoggerService/appLogger.service';

import { BaseUploadService } from './baseUpload.service';

@Injectable()
export class WebServerUploadService extends BaseUploadService {
  private imageDir = join(__dirname, '../../../public/assets/images');

  constructor(
    private readonly config: AppConfigService,
    private readonly logger: AppLoggerService,
  ) {
    super();
    const isExistsDir = this.isExistsDir(this.imageDir);
    if (!isExistsDir) {
      mkdir(this.imageDir, { recursive: true }, (err) => {
        if (err) {
          this.logger.error('Error occur when create serve static folder', err);
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

  async storeImages(images: Express.Multer.File[]): Promise<
    {
      fileName: string;
      url: string;
    }[]
  > {
    try {
      const result = await Promise.all(
        images.map((item) => this.storeImage(item)),
      );

      return result.filter((item) => !!item);
    } catch (err) {
      this.logger.error('🚀 ~ UploadService ~ storeImages ~ err:', err);

      return [];
    }
  }

  async storeImage(image: Express.Multer.File): Promise<{
    fileName: string;
    url: string;
  } | null> {
    const fileName = this.fileNameGenerator(image);

    if (!fileName) {
      return null;
    }

    const filePath = `${this.imageDir}/${fileName}`;
    await writeFile(filePath, image.buffer);

    return {
      fileName,
      url: this.imageUrlGenerator(fileName),
    };
  }

  imageUrlGenerator(fileName: string): string {
    return `${this.config.imageBaseUrl}${fileName}`;
  }
}

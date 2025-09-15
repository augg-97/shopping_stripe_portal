import { Inject, Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { IMinioConfig, minioConfig } from '@appConfigs/minio.config';

import { BaseUploadService } from './baseUpload.service';

@Injectable()
export class MinioUploadService extends BaseUploadService {
  private client: S3Client;
  private bucket: string;

  constructor(@Inject(minioConfig.KEY) private readonly config: IMinioConfig) {
    super();
    this.client = new S3Client({
      region: this.config.minioRegion,
      endpoint: this.config.minioEndpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.config.minioAccessKey,
        secretAccessKey: this.config.minioSecret,
      },
    });
    this.bucket = this.config.minioBucket;
  }

  async storeObject(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{
    fileName: string;
    url: string;
  } | null> {
    const fileName = this.fileNameGenerator(file);

    if (!fileName) {
      return null;
    }

    const key = `${userId}/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const response = await this.client.send(command);
    const url = await this.getPreSignUrl(key);
    return {
      fileName,
      url,
    };
  }

  async getPreSignUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const url = await getSignedUrl(this.client, command, { expiresIn: 3600 });
    return url;
  }
}

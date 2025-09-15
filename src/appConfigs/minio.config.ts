import { registerAs } from '@nestjs/config';

export interface IMinioConfig {
  minioAccessKey: string;
  minioSecret: string;
  minioBucket: string;
  minioRegion: string;
  minioEndpoint: string;
}

export const minioConfiguration = (): IMinioConfig => ({
  minioAccessKey: process.env.MINIO_ACCESS_KEY || '',
  minioSecret: process.env.MINIO_SECRET_KEY || '',
  minioBucket: process.env.MINIO_BUCKET || 'sps-portal',
  minioRegion: process.env.MINIO_REGION || 'us-east-1',
  minioEndpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
});

export const minioConfig = registerAs('AWS', minioConfiguration);

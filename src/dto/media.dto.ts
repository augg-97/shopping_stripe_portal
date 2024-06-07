import { Media } from "@prisma/client";

export class MediaDto {
  id: number;
  fileName: string;
  url: string;
  createdAt: string;
  updatedAt: string;

  builder(media: Media) {
    this.id = media.id;
    this.fileName = media.fileName;
    this.url = media.url;
    this.createdAt = media.createdAt.toISOString();
    this.updatedAt = media.updatedAt.toISOString();
  }

  toResponse(): MediaDto {
    return { ...this };
  }
}

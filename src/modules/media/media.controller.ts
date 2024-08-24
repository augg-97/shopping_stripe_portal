import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('images/upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImages(
    @Req() req: Request,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.mediaService.uploadImages(images, req.user);
  }
}

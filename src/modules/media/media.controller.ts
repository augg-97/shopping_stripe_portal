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
import { FilesInterceptor } from '@nestjs/platform-express';

import { AuthUserRequest } from '@decorators/authUserRequest.decorator';
import { AuthUser } from '@services/tokenService/authUser';
import { ResponseSerializerInterceptor } from '@interceptors/responseSerializer.interceptor';
import { BaseMediaDto } from '@dtos/media/baseMedia.dto';

import { MediaService } from './media.service';

@ApiBearerAuth()
@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseInterceptors(
    FilesInterceptor('images'),
    new ResponseSerializerInterceptor(BaseMediaDto),
  )
  @HttpCode(HttpStatus.OK)
  @Post('images/upload')
  async uploadImages(
    @AuthUserRequest('user') authUser: AuthUser,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.mediaService.uploadImages(images, authUser);
  }
}

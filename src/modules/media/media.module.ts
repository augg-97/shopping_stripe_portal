import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';

@Module({
  imports: [],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
  exports: [],
})
export class MediaModule {}

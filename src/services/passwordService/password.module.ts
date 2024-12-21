import { Global, Module } from '@nestjs/common';
import { PasswordService } from './password.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}

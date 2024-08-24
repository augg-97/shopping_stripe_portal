import { Global, Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ConfigurationModule } from '../../config/configuration.module';

@Global()
@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}

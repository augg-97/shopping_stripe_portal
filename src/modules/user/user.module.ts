import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetMeService } from './getMe/getMe.service';
import { GetUserByIdService } from './getUserById/getUserById.service';
import { UserRepository } from './user.repository';
import { UpdateProfileService } from './updateProfile/updateProfile.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserRepository,
    GetMeService,
    GetUserByIdService,
    UpdateProfileService,
  ],
  exports: [],
})
export class UserModule {}

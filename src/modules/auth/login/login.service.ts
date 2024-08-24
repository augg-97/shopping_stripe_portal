import { Injectable } from '@nestjs/common';
import { LoginPayload } from './login.payload';
import { UserNotExistsException } from '../../../exceptions/badRequest/userNotExists.exception';
import { PasswordService } from '../../../services/passwordService/password.service';
import { BadRequestException } from '../../../exceptions/badRequest/badRequest.exception';
import { CredentialDeniedException } from '../../../exceptions/unauthorized/credentialDenied.exception';
import { UserRepository } from '../../user/user.repository';
import { UserDto } from '../../../dto/user.dto';
import { plainToClass } from 'class-transformer';
import { EXPOSE_GROUP_PRIVATE } from '../../../helpers/constant';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(payload: LoginPayload): Promise<UserDto> {
    const { email, password } = payload;
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UserNotExistsException();
    }

    if (!user.passwordHashed) {
      throw new BadRequestException(
        'ACCOUNT_NOT_HAS_PASSWORD',
        'Account not settings password',
      );
    }

    const isMatchPassword = await this.passwordService.comparePassword(
      password,
      email,
      user.passwordHashed,
    );

    if (!isMatchPassword) {
      throw new CredentialDeniedException();
    }

    return plainToClass(UserDto, user, { groups: [EXPOSE_GROUP_PRIVATE] });
  }
}

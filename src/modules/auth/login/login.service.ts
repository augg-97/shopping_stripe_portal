import { Injectable } from '@nestjs/common';
import { LoginPayload } from './login.payload';
import { UserNotExistsException } from '../../../exceptions/badRequest/userNotExists.exception';
import { PasswordService } from '../../../services/passwordService/password.service';
import { BadRequestException } from '../../../exceptions/badRequest/badRequest.exception';
import { CredentialDeniedException } from '../../../exceptions/unauthorized/credentialDenied.exception';
import { UserRepository } from '../../../repositories/user.repository';
import { UserDtoBuilder } from '../../../dtos/users/user.builder';
import { UserWithStoreDto } from '../../../dtos/users/userWithStore.dto';
import { IUserDto } from '../../../dtos/users/user.interface';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(payload: LoginPayload): Promise<IUserDto> {
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

    const builder = new UserDtoBuilder();
    const dto = new UserWithStoreDto(builder, true);
    dto.build(user);

    return builder.toDto();
  }
}

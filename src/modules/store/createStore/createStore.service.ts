import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../store.repository';
import { AuthUser } from '../../../services/tokenService/authUser';
import { CreateStorePayload } from './createStore.payload';
import { Prisma } from '@prisma/client';
import { ConflictException } from '../../../exceptions/conflict/conflict.exception';

@Injectable()
export class CreateStoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(
    authUser: AuthUser,
    payload: CreateStorePayload,
  ): Promise<unknown> {
    const { name } = payload;

    const createStoreInput: Prisma.StoreCreateInput = {
      name,
      owner: {
        connect: {
          id: Number(authUser.id),
        },
      },
    };
    const store = await this.storeRepository.create(createStoreInput);

    if (!store) {
      throw new ConflictException(
        'CREATE_STORE_ERROR',
        'Unable to create store at this time',
      );
    }

    return store;
  }
}

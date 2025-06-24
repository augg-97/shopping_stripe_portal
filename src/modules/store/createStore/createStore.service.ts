import { Injectable } from '@nestjs/common';
import { Prisma, Store } from '@prisma/client';

import { AuthUser } from '@services/tokenService/authUser';
import { ConflictException } from '@exceptions/conflict/conflict.exception';
import { StoreRepository } from '@repositories/store.repository';

import { CreateStorePayload } from './createStore.payload';

@Injectable()
export class CreateStoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(
    authUser: AuthUser,
    payload: CreateStorePayload,
  ): Promise<Store> {
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

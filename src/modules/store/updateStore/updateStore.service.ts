import { Injectable } from '@nestjs/common';

import { AuthUser } from '@services/tokenService/authUser';
import { StoreRepository } from '@repositories/store.repository';

import { UpdateStorePayload } from './updateStore.payload';

@Injectable()
export class UpdateStoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(id: number, authUser: AuthUser, payload: UpdateStorePayload) {}
}

import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../../services/tokenService/authUser';
import { UpdateStorePayload } from './updateStore.payload';
import { StoreRepository } from '../../../repositories/store.repository';

@Injectable()
export class UpdateStoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(id: number, authUser: AuthUser, payload: UpdateStorePayload) {}
}

import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../store.repository';
import { AuthUser } from '../../../services/tokenService/authUser';
import { UpdateStorePayload } from './updateStore.payload';

@Injectable()
export class UpdateStoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(id: number, authUser: AuthUser, payload: UpdateStorePayload) {}
}

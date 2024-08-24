import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  ping(): { message: string } {
    return { message: 'PONG' };
  }
}

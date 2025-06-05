import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

import { uuidGenerator } from '../pkgs/uuidGenerator';

@Injectable()
export class ClientIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientId = req.headers['client-id'];
    if (!clientId) {
      const newClientId = uuidGenerator();
      req.headers['client-id'] = newClientId;
      res.setHeader('client-id', newClientId);

      next();
      return;
    }

    res.setHeader('client-id', clientId);

    next();
  }
}

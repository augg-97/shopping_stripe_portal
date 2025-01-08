import { NextFunction, Request, Response } from 'express';
import { uuidGenerator } from '../pkgs/uuidGenerator';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ClientIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientId = req.headers['client-id'];
    if (!clientId) {
      const newClientId = uuidGenerator();
      req.headers['client-id'] = newClientId;
      res.setHeader('client-id', newClientId);

      return next();
    }

    res.setHeader('client-id', clientId);

    return next();
  }
}

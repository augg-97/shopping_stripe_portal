import { NextFunction, Request, Response } from 'express';
import { uuidGenerator } from '../pkgs/uuidGenerator';

export const clientIdMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.headers['client_id'];
    if (!clientId) {
      const newClientId = uuidGenerator();
      req.headers['client_id'] = newClientId;
      res.setHeader('client_id', newClientId);
      return next();
    }

    res.setHeader('client_id', clientId);
    return next();
  };

import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../services/loggerService/logger.service";
import { uuidGenerator } from "../pkgs/uuidGenerator";

export const correlationMiddleware = (logger: LoggerService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const correlationId = uuidGenerator();
    req.headers["correlationId"] = correlationId;
    res.setHeader("correlationId", correlationId);
    logger.setCorrelationId = correlationId;

    return next();
  };
};

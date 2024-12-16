/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import { AppConfigService } from '../../appConfigs/appConfig.service';
import util from 'util';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logger: Logger;

  constructor(private appConfigService: AppConfigService) {
    super();
    const { combine, timestamp, printf, colorize } = format;
    this.logger = createLogger({
      level: 'debug',
      format: combine(
        format.label({ label: 'SPS_API_LOGGER' }),
        timestamp(),
        printf((info) => {
          const { correlationId, level, message, label, timestamp, ...meta } =
            info;

          const splatMeta = meta[Symbol.for('splat')];
          const metadata = Array.isArray(splatMeta)
            ? splatMeta[0]
            : Object.values(meta);

          return `[${label}] [${timestamp}] [${level.toUpperCase()}]${correlationId ? ` [${correlationId}] ` : ''}${util.format(message, ...metadata)}`;
        }),
      ),
      transports:
        this.appConfigService.nodeEnv === 'development'
          ? [new transports.Console({ format: colorize({ all: true }) })]
          : [
              new transports.Console({ format: colorize({ all: true }) }),
              new transports.File({ filename: 'public/logs/rtc_logs.log' }),
            ],
    });
  }

  set setCorrelationId(correlationId: string) {
    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      correlationId,
    };
  }

  get getCorrelationId(): string {
    return this.logger.defaultMeta.correlationId;
  }

  log(message: string, ...meta: any[]): void {
    this.logger.info(message, meta);
  }

  warn(message: string, ...meta: any[]): void {
    this.logger.warn(message, meta);
  }

  error(message: string, ...meta: any[]): void {
    this.logger.error(message, meta);
  }

  debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, meta);
  }
}

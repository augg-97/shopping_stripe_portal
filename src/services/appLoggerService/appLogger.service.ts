/* eslint-disable @typescript-eslint/no-explicit-any */
import { join } from 'path';
import util from 'util';

import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';

import { AppConfigService } from '@appConfigs/appConfig.service';

import { LoggerContextService } from './loggerContext.service';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService implements LoggerService {
  private readonly logger: Logger;
  private readonly logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
  };

  constructor(
    private readonly config: AppConfigService,
    private readonly loggerContextService: LoggerContextService,
  ) {
    const { combine, printf, timestamp } = format;
    this.logger = createLogger({
      levels: this.logLevels,
      defaultMeta: {
        label: 'SPS_PORTAL',
      },
      format: combine(
        timestamp(),
        printf((data) => {
          const {
            message,
            level,
            timestamp,
            label,
            correlationId,
            serviceName,
            ...metadata
          } = data;

          const splat = metadata[Symbol.for('splat')];
          const meta = Array.isArray(splat) ? splat : [splat];

          return `[${label}] [${timestamp}] [${level.toUpperCase()}]${serviceName ? ` [${serviceName}]` : ''}${correlationId ? ` [${correlationId}]` : ''} ${util.format(message, ...meta[0])}`;
        }),
      ),
    });

    if (this.config.nodeEnv === 'development') {
      this.logger.add(new transports.Console({ level: 'debug' }));
    }

    this.logger.add(
      new transports.File({
        filename: join(__dirname, '../../../public/logs/rtc_logs.log'),
        level: 'info',
      }),
    );
  }

  set serviceName(name: string) {
    this.logger.defaultMeta.serviceName = name;
  }

  log(message: any, ...optionalParams: any[]): void {
    this.setCorrelationId();
    this.logger.info(message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    this.setCorrelationId();
    this.logger.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.setCorrelationId();
    this.logger.warn(message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    this.setCorrelationId();
    this.logger.debug(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): void {
    this.setCorrelationId();
    this.logger.verbose(message, optionalParams);
  }

  private setCorrelationId(): void {
    this.logger.defaultMeta.correlationId =
      this.loggerContextService.getCorrelationId();
  }
}

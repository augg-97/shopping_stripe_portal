import { join } from 'path';
import util from 'util';

import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { captureException } from '@sentry/nestjs';

import { AppConfigService } from '@appConfigs/appConfig.service';

@Injectable()
export class LoggerClient {
  private readonly logger: Logger;
  private readonly logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
  };

  constructor(private readonly config: AppConfigService) {
    this.logger = createLogger({
      levels: this.logLevels,
      defaultMeta: {
        label: this.config.serviceName,
      },
    });

    this.logger.add(this.setConsoleTransport());

    if (this.config.nodeEnv !== 'development') {
      this.logger.add(this.setDailyRotateTransport());
    }
  }

  set serviceName(name: string) {
    this.logger.defaultMeta.serviceName = name;
  }

  private setConsoleTransport(): transports.ConsoleTransportInstance {
    const { combine, printf, timestamp } = format;
    const transport = new transports.Console({
      level: 'debug',
      format: combine(
        timestamp(),
        printf((info) => {
          const {
            message,
            level,
            timestamp,
            label,
            traceId,
            serviceName,
            meta,
          } = info;

          const metadata =
            Array.isArray(meta) && meta.length > 0
              ? `${util.format(message, ...meta)}`
              : `${util.format(message)}`;

          return `[${label}] [${timestamp}] [${level.toUpperCase()}]${serviceName ? ` [${serviceName}]` : ''}${traceId ? ` [${traceId}]` : ''} ${metadata}`;
        }),
      ),
    });

    return transport;
  }

  private setDailyRotateTransport(): DailyRotateFile {
    const { combine, json, timestamp, errors } = format;
    const transport = new DailyRotateFile({
      level: 'info',
      dirname: join(__dirname, '../../../public/logs'),
      filename: 'sps-log-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: combine(
        errors({ stack: true }),
        timestamp(),
        format((info) => {
          const {
            message,
            level,
            timestamp,
            label,
            traceId,
            serviceName,
            stack,
            meta,
          } = info;
          const metadata =
            Array.isArray(meta) && meta.length > 0
              ? `${util.format(message, ...meta)}`
              : `${util.format(message)}`;
          return {
            label,
            level,
            timestamp,
            traceId,
            serviceName,
            message: metadata,
            stack,
          };
        })(),
        json(),
      ),
    });

    transport.on('rotate', (oldFileName, newFileName) => {
      this.logger.info(`[Rotate] ${oldFileName} -> ${newFileName}`);
    });

    transport.on('error', (error) => {
      this.logger.error('Error in DailyRotateFile transport:', error);
      captureException(error);
    });

    return transport;
  }

  getLogger(): Logger {
    return this.logger;
  }
}

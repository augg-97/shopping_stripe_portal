/* eslint-disable @typescript-eslint/no-explicit-any */
import { join } from 'path';
import util from 'util';

import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { captureException } from '@sentry/nestjs';

import { AppConfigService } from '@appConfigs/appConfig.service';

import { LoggerContextService } from './loggerContext.service';
import { LoggerClient } from './logger.client';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService implements LoggerService {
  private _serviceName = '';

  constructor(
    private readonly loggerClient: LoggerClient,
    private readonly loggerContextService: LoggerContextService,
  ) {}

  set serviceName(name: string) {
    this._serviceName = name;
  }

  log(message: any, ...optionalParams: any[]): void {
    this.loggerClient.getLogger().info(message, {
      meta: optionalParams,
      traceId: this.loggerContextService.getTraceId(),
      serviceName: this._serviceName,
    });
  }

  error(message: any, ...optionalParams: any[]): void {
    this.loggerClient.getLogger().error(message, {
      meta: optionalParams,
      traceId: this.loggerContextService.getTraceId(),
      serviceName: this._serviceName,
    });
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.loggerClient.getLogger().warn(message, {
      meta: optionalParams,
      traceId: this.loggerContextService.getTraceId(),
      serviceName: this._serviceName,
    });
  }

  debug(message: any, ...optionalParams: any[]): void {
    this.loggerClient.getLogger().debug(message, {
      meta: optionalParams,
      traceId: this.loggerContextService.getTraceId(),
      serviceName: this._serviceName,
    });
  }

  verbose(message: any, ...optionalParams: any[]): void {
    this.loggerClient.getLogger().verbose(message, {
      meta: optionalParams,
      traceId: this.loggerContextService.getTraceId(),
      serviceName: this._serviceName,
    });
  }
}

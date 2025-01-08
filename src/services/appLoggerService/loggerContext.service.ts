import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export interface ILoggerContext {
  correlationId: string;
}

@Injectable()
export class LoggerContextService extends AsyncLocalStorage<ILoggerContext> {
  constructor() {
    super();
  }

  setContext(context: ILoggerContext, fn: () => void): void {
    this.run(context, () => fn());
  }

  getCorrelationId(): string {
    return this.getStore()?.correlationId || '';
  }
}

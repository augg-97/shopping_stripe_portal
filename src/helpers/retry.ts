import { LoggerService } from '../services/loggerService/logger.service';
import { wait } from './wait';

export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number,
  delay: number,
  logger: LoggerService,
) => {
  try {
    for (let i = 1; i <= retries; i++) {
      await wait(delay);
      await fn();
    }
  } catch (error) {
    logger.error('🚀 ~ error:', error);
  }
};

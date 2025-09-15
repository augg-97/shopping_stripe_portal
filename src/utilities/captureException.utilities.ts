import * as Sentry from '@sentry/nestjs';

import { appConfiguration } from '@appConfigs/appConfiguration';

const { sentryDsn, nodeEnv } = appConfiguration();

if (nodeEnv !== 'development') {
  Sentry.init({
    dsn: sentryDsn,
    sendDefaultPii: true,
    environment: nodeEnv,
  });
}

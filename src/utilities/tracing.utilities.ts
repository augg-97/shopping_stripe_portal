import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  SemanticResourceAttributes,
} from '@opentelemetry/semantic-conventions';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

import { appConfiguration } from '@appConfigs/appConfiguration';

const { otelCollectorGrpcUrl, serviceName, nodeEnv } = appConfiguration();

const traceExporter = new OTLPTraceExporter({
  url: otelCollectorGrpcUrl,
});

const metricsExporter = new OTLPMetricExporter({
  url: otelCollectorGrpcUrl,
});

const sdk = new NodeSDK({
  traceExporter,
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricsExporter,
    exportIntervalMillis: 10000,
  }),
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: serviceName,
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: nodeEnv,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

if (nodeEnv !== 'development') {
  sdk.start();
}

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => {
      console.log('OpenTelemetry SDK is shutting down');
    })
    .catch((error) => {
      console.error('Error shutting down OpenTelemetry SDK:', error);
    })
    .finally(() => {
      process.exit(0);
    });
});

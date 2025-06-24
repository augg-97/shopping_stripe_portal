// import { NodeSDK } from '@opentelemetry/sdk-node';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
// import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import { Resource, resourceFromAttributes } from '@opentelemetry/resources';
// import {
//   ATTR_SERVICE_NAME,
//   SemanticResourceAttributes,
//   SEMRESATTRS_SERVICE_NAME,
// } from '@opentelemetry/semantic-conventions';

// import { appConfiguration } from '@appConfigs/appConfiguration';

// const traceExporter = new OTLPTraceExporter({
//   // url: appConfiguration().otelCollectorUrl,
//   url: appConfiguration().apmServerUrl,
// });

// const sdk = new NodeSDK({
//   traceExporter,
//   resource: resourceFromAttributes({
//     [ATTR_SERVICE_NAME]: appConfiguration().serviceName,
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });

// sdk.start();

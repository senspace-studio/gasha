import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://f07d2a2d11c14520ff811207983fb3c4@o4506995377307648.ingest.us.sentry.io/4506995379077120',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})

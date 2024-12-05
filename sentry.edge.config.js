// This file configures the initialization of Sentry for edge features
// (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also
// required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://3e5e88a89d1bf3ebd8da3d47359016fd@o4505199469854720.ingest.sentry.io/4505741641777152',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  /*
    Setting this option to true will print useful
    information to the console while you're setting up Sentry.
  */
  debug: false,
});

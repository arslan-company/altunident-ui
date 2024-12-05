// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
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

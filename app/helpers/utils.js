import config from 'config';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

const SENTRY_DNS = config.get('sentry.dns');

export const ERROR_MSG =
  'Looks like the server is taking too long to respond, please try again later';
export const CONN_ERROR =
  'There was an error connecting to the server. Please try again later';

export const initializeSentry = (app) => {

  Sentry.init({
    dsn: SENTRY_DNS,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());

};

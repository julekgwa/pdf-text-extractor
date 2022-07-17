import express from 'express';
import SwaggerParser from 'swagger-parser';
import { connector } from 'swagger-routes-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { extractText } from './controllers/extractText.js';
import { StatusCodes } from 'http-status-codes';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import { initializeSentry } from './helpers/utils.js';
import { extractTextFromImage } from './controllers/extractTextFromImage.js';

const routes = {
  extractText,
  extractTextFromImage,
};

const makeApp = async () => {

  const parser = new SwaggerParser();
  const apiDescription = await parser.validate('app/swagger/swagger.yml');
  const connect = connector(routes, apiDescription);
  const app = express();

  initializeSentry(app);
  app.use(express.json());
  app.use(cors());
  app.use(
    OpenApiValidator.middleware({
      apiSpec: 'app/swagger/swagger.yml',
    }),
  );

  app.use((err, req, res, next) => {

    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      errors: err.errors,
    });

  });

  // swagger ui
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDescription));

  connect(app);

  return app;

};

export { makeApp };

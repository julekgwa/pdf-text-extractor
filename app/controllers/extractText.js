/* eslint-disable no-magic-numbers */
import { extractTextFromPdf } from '../clients/pdf-client.js';
import * as Sentry from '@sentry/node';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MSG } from '../helpers/utils.js';
export const extractText = async (req, res) => {

  try {

    const text = await extractTextFromPdf(req.files[0].buffer);

    res.status(StatusCodes.OK).json({
      ok: true,
      text,
    });

  } catch (error) {

    Sentry.captureException(error);
    const message = error.message || ERROR_MSG;

    res.status(StatusCodes.NOT_FOUND);
    res.json({
      message,
    });

  }

};

/* eslint-disable no-magic-numbers */
import * as Sentry from '@sentry/node';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MSG } from '../helpers/utils.js';
import sharp from 'sharp';
import tesseract from 'node-tesseract-ocr';
export const extractTextFromImage = async (req, res) => {

  try {

    const buffer = await sharp(req.files[0].buffer).sharpen(13)
      .toBuffer();

    const text = await tesseract.recognize(buffer);

    res.status(StatusCodes.OK).json({
      ok: true,
      text: text?.replace(/\n|\r\n|\r/g, ' '),
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

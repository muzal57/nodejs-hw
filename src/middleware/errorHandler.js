import { HttpError, isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (err instanceof HttpError || isHttpError(err)) {
    return res.status(err.status).json({ message: err.message || err.name });
  }
  res.status(500).json({ message: isProd ? 'Server Error' : err.stack });
};

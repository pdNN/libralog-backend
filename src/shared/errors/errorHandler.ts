import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import AppError from '@shared/errors/AppError';
import { format } from 'date-fns-tz';
import chalk from 'chalk';
import { newDate } from '@shared/utils/DateFormat';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(
    `[${chalk.red('ERROR')}] ${chalk.gray.bold(
      format(newDate(), 'dd/MM/yy HH:mm:ss'),
    )} ${err}`,
  );

  if (err instanceof ZodError) {
    return res.status(400).send({ errors: err.flatten().fieldErrors });
  }

  if (process.env.NODE_ENV === 'dev') {
    return res.status(500).json({ status: 'error', message: err });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
}

import { NextApiRequest, NextApiResponse } from "next";
import { HttpException, Catch } from "next-api-decorators";
import { getLogger } from "utils/logger";
import * as Sentry from "@sentry/nextjs";

export class UnknownException extends HttpException {
  public constructor(
    message: string = "An unknown error occurred.",
    errors: string[] | undefined = undefined
  ) {
    super(500, message, errors);
  }
}

export function exceptionHandler(
  error: unknown,
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const logger = getLogger(exceptionHandler.name);
  logger.error(error);

  Sentry.captureException(error);

  if (error instanceof HttpException) {
    const errorBody = {
      name: error.name,
      statusCode: error.statusCode,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
      errors: error.errors,
    };
    res.status(error.statusCode).json(errorBody);
  }
}

/**
 * Decorator interceptor that adds an exception handler to a controller or method
 */
export const CatchException = (): ClassDecorator & MethodDecorator =>
  Catch(exceptionHandler);

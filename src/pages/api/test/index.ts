import type { NextApiRequest, NextApiResponse } from "next";
import {
  Catch,
  createHandler,
  Get,
  HttpException,
  Req,
} from "next-api-decorators";

export class UnknownException extends HttpException {
  public constructor(
    message: string = "An unknown error occurred.",
    errors: string[] | undefined = undefined
  ) {
    super(500, message, errors);
  }
}

function exceptionHandler(
  _error: UnknownException,
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(500).end();
}

@Catch(exceptionHandler, UnknownException)
class UserHandler {
  @Get()
  users(@Req() req: NextApiRequest) {
    return `hello there from ${req.url}`;
  }
}

export default createHandler(UserHandler);

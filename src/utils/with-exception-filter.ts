import { getAuth } from "@clerk/nextjs/server";
import { NextApiHandler, NextApiResponse } from "next";
import { withAxiom } from "next-axiom";
import { AxiomAPIRequest } from "next-axiom/dist/withAxiom";
import {
  getExceptionMessage,
  getExceptionStack,
  getExceptionStatus,
} from "./get-exception";

export default withAxiom(function withExceptionFilter(
  req: AxiomAPIRequest,
  res: NextApiResponse
) {
  return async function (handler: NextApiHandler) {
    try {
      await handler(req, res);
    } catch (exception) {
      const { url, headers } = req;
      const statusCode = getExceptionStatus(exception);
      const message = getExceptionMessage(exception);
      const stack = getExceptionStack(exception);

      // get the user from clerk
      const auth = getAuth(req);
      const userId = auth?.userId ?? "Not Authenticated";

      const referer = headers["referer"];
      const userAgent = headers["user-agent"];

      // this is the context being logged
      const requestContext = {
        url,
        userId,
        referer,
        userAgent,
        message,
      };

      const exceptionMessage = "An unhandled exception occurred.";

      req.log.error(exceptionMessage, requestContext);

      if (stack) {
        req.log.debug("stack", stack);
      }

      const timestamp = new Date().toISOString();

      const responseBody = {
        statusCode,
        timestamp,
        path: req.url,
      };

      return res.status(statusCode).send(responseBody);
    }
  };
});

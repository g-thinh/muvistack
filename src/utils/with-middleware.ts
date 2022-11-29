import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

type Maybe<T> = NonNullable<T> | undefined;

/**
 * @name withMiddleware
 * @see {@link https://giancarlobuomprisco.com/next/middleware-pipes-nextjs}
 * @description combine multiple middleware before handling your API endpoint
 * @param middlewares
 */
export function withMiddleware(...middlewares: NextApiHandler[]) {
  return async function withMiddlewareHandler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    async function evaluateHandler(
      middleware: NextApiHandler,
      innerMiddleware?: Maybe<NextApiHandler>
    ) {
      // return early when the request has
      // been ended by a previous middleware
      if (res.headersSent) {
        return;
      }

      if (typeof middleware === "function") {
        const handler = await middleware(req, res);

        if (typeof handler === "function") {
          if (innerMiddleware) {
            await handler(innerMiddleware);

            const index = middlewares.indexOf(innerMiddleware);

            // remove inner middleware
            if (index >= 0) {
              middlewares.splice(index, 1);
            }
          } else {
            await handler();
          }
        }
      }
    }

    for (let index = 0; index < middlewares.length; index++) {
      const middleware = middlewares[index];
      const nextMiddleware = middlewares[index + 1];

      await evaluateHandler(middleware, nextMiddleware);
    }
  };
}

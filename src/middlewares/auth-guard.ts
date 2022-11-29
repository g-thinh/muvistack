import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from "next-api-decorators";

/**
 * Decorator guard that checks for a valid authentication
 */
export const AuthGuard = createMiddlewareDecorator(
  (req: NextApiRequest, _res: NextApiResponse, next: NextFunction) => {
    const { userId } = getAuth(req);

    if (!userId) {
      throw new UnauthorizedException();
    }

    next();
  }
);

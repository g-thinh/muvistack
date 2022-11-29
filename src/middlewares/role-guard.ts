import { getAuth } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createMiddlewareDecorator,
  ForbiddenException,
  NextFunction,
  UnauthorizedException,
} from "next-api-decorators";
import { UserService } from "services/user-service";

/**
 * Decorator guard that checks for the user's role
 * @param roles a list of roles allowed to access the requested resource
 */
export const RoleGuard = (roles: Role[]) =>
  createMiddlewareDecorator(
    async (req: NextApiRequest, _res: NextApiResponse, next: NextFunction) => {
      const { userId } = getAuth(req);

      if (!userId) {
        throw new UnauthorizedException();
      }

      const userService = new UserService();

      const user = await userService.findOne(userId);

      if (!roles.includes(user.role)) {
        throw new ForbiddenException("invalid role");
      }

      next();
    }
  )();

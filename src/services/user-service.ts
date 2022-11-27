import { BadRequestException, NotFoundException } from "next-api-decorators";
import { prisma } from "utils/prisma/client";

/**
 * User service class with methods to interface with the User entity
 */
export class UserService {
  public async findOne(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async findAll() {
    const users = await prisma.user.findMany();
    return users;
  }

  public async removeById(userId: string) {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }
}

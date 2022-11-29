import { BadRequestException, NotFoundException } from "next-api-decorators";
import { ClerkPayload, CreatedUserData } from "types/clerk";
import { prisma } from "utils/prisma";

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

  public async update(updateDto: ClerkPayload<CreatedUserData>) {
    const primaryEmail = updateDto.data?.email_addresses?.find(
      (email) => email?.id === updateDto?.data?.primary_email_address_id
    )?.email_address;

    await prisma.user
      .update({
        where: {
          id: updateDto.data.id,
        },
        data: {
          email: primaryEmail,
          firstName: updateDto.data.first_name,
          lastName: updateDto.data.last_name,
          updatedAt: new Date(updateDto.data.updated_at),
        },
      })
      .catch((error: unknown) => console.error("prisma error", error));
  }

  public async create(createDto: ClerkPayload<CreatedUserData>) {
    const primaryEmail = createDto.data?.email_addresses?.find(
      (email) => email?.id === createDto?.data?.primary_email_address_id
    )?.email_address;

    await prisma.user
      .create({
        data: {
          id: createDto.data.id,
          email: primaryEmail,
          firstName: createDto.data.first_name,
          lastName: createDto.data.last_name,
          createdAt: new Date(createDto.data.created_at),
          image: createDto.data.profile_image_url,
        },
      })
      .catch((error: unknown) => console.error("prisma error", error));
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

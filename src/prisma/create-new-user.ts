import { ClerkPayload, CreatedUserData, DeletedUserData } from "types/clerk";
import { prisma } from "./client";

export async function createNewUser(message: ClerkPayload<CreatedUserData>) {
  const primaryEmail = message.data?.email_addresses?.find(
    (email) => email?.id === message?.data?.primary_email_address_id
  )?.email_address;

  await prisma.user
    .create({
      data: {
        id: message.data.id,
        email: primaryEmail,
        firstName: message.data.first_name,
        lastName: message.data.last_name,
        createdAt: new Date(message.data.created_at),
      },
    })
    .catch((error) => console.error("prisma error", error));
}

export async function deleteUser(message: ClerkPayload<DeletedUserData>) {
  await prisma.user
    .delete({
      where: {
        id: message.data.id,
      },
    })
    .catch((error) => console.error("prisma error", error));
}

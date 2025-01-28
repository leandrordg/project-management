import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const userStorageVerification = async () => {
  const user = await currentUser();

  if (!user) return;

  const storedUser = await prisma.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (storedUser) return;

  await prisma.user.create({
    data: {
      userId: user.id,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? undefined,
      fullName: user.fullName ?? undefined,
      username: user.username ?? undefined,
      emailAddress: user.primaryEmailAddress?.emailAddress ?? "",
      phoneNumber: user.primaryPhoneNumber?.phoneNumber ?? undefined,
      avatar: user.imageUrl ?? undefined,
    },
  });
};

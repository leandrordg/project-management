import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

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

export const getUserById = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
    include: {
      projects: true,
    },
  });

  if (!user) throw new Error("Usuário não encontrado");

  // se o usuário não for o dono, retornar apenas os projetos públicos
  if (user.userId !== currentUserId) {
    return {
      ...user,
      projects: user.projects.filter((project) => project.isPublic),
    };
  }

  return user;
};

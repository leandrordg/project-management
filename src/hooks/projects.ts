import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getProjectById = async (projectId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Usuário não autenticado");

  return await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });
};

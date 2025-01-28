"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const createProject = async ({ name }: { name: string }) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Usuário não autenticado");

  return await prisma.project.create({
    data: {
      name,
      userId,
    },
  });
};

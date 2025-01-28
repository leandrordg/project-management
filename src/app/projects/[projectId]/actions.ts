"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const deleteProjectById = async (projectId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Usuário não autenticado");

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!project) throw new Error("Projeto não encontrado");

  if (project.userId !== userId) throw new Error("Usuário não autorizado");

  return await prisma.project.delete({ where: { id: project.id } });
};

export const updateProjectById = async (
  projectId: string,
  data: {
    shortDescription: string;
    description?: string;
    repositoryUrl: string;
    isPublic: boolean;
  }
) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Usuário não autenticado");

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!project) throw new Error("Projeto não encontrado");

  return prisma.project.update({
    where: { id: project.id },
    data: { ...data, finishedSteps: true },
  });
};

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getPublicProjects = async () => {
  return await prisma.project.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
};

export const getProjectsByUserId = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  // se não for o dono do projeto, retorna somente os projetos públicos
  if (userId !== currentUserId)
    return projects.filter((project) => project.isPublic);

  return projects;
};

export const getProjectById = async (projectId: string) => {
  const { userId } = await auth();

  const project = await prisma.project.findFirst({
    where: { id: projectId },
    include: { user: true },
  });

  // se não encontrar o projeto, lança um erro
  if (!project) throw new Error("Projeto não encontrado");

  // se o projeto for privado e o usuário não for o dono, lança um erro
  if (!project.isPublic && project.userId !== userId)
    throw new Error("Acesso negado");

  return project;
};

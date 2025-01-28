import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getPublicProjects = async () => {
  return await prisma.project.findMany({
    where: {
      isPublic: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
};

export const getPublicProjectsByUserId = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: {
      isPublic: true,
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return projects;
};

export const getProjectById = async (projectId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Usuário não autenticado");

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    include: {
      user: true,
    },
  });

  return project;
};

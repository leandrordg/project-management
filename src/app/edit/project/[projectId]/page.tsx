import { notFound } from "next/navigation";

import { getProjectById } from "@/hooks/projects";
import { auth } from "@clerk/nextjs/server";

import { EditProjectForm } from "./form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { userId } = await auth();

  const { projectId } = await params;

  const project = await getProjectById(projectId);

  if (project.userId !== userId) return notFound();

  return (
    <main className="max-w-4xl mx-auto md:p-4 space-y-4">
      <article className="card">
        <h1 className="heading">Editar {project.name}</h1>

        <p className="description">
          Altere as informações do seu projeto. Lembre-se de manter as
          informações atualizadas para que os interessados possam entrar em
          contato.
        </p>

        <EditProjectForm project={project} />
      </article>
    </main>
  );
}

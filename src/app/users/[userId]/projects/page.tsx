import { ProjectCard } from "@/components/project-card";
import { getPublicProjectsByUserId } from "@/hooks/projects";

import { InfoIcon } from "lucide-react";

export default async function UserProjectsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const projects = await getPublicProjectsByUserId(userId);

  return (
    <main className="max-w-4xl mx-auto md:p-4 space-y-4">
      {!projects.length && (
        <article className="card flex-row items-center gap-3">
          <InfoIcon className="size-4 text-muted-foreground" />
          <p className="description">Nenhum projeto encontrado.</p>
        </article>
      )}

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} user={project.user} />
      ))}
    </main>
  );
}

import { getPublicProjects } from "@/hooks/projects";
import { cn } from "@/lib/utils";

import { ProjectCard } from "@/components/project-card";
import { InfoIcon } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <main className="max-w-4xl mx-auto md:p-4 space-y-4">
      {!projects.length && (
        <article className={cn("card flex-row items-center gap-3")}>
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

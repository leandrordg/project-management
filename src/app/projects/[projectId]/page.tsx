import { notFound } from "next/navigation";

import { getProjectById } from "@/hooks/projects";
import { formatDate } from "@/lib/utils";

import { EyeOffIcon, HammerIcon } from "lucide-react";
import { RequiredStepsForm } from "./form";
import { ProjectDetails } from "./project-details";

export default async function IndividualProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  if (!project) return notFound();

  return (
    <main className="max-w-4xl mx-auto md:p-4 space-y-4">
      <article className="card">
        <p className="short-description">
          {formatDate(project.createdAt, {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </p>

        {(!project.finishedSteps || !project.isPublic) && (
          <div className="flex items-center gap-2">
            {!project.finishedSteps && (
              <div className="flex items-center gap-1 text-muted-foreground hover:bg-muted px-1.5 py-0.5 rounded-md border select-none w-fit">
                <HammerIcon className="size-3" />
                <span className="text-xs">Em andamento</span>
              </div>
            )}
            {!project.isPublic && (
              <div className="flex items-center gap-1 text-muted-foreground hover:bg-muted px-1.5 py-0.5 rounded-md border select-none w-fit">
                <EyeOffIcon className="size-3" />
                <span className="text-xs">Privado</span>
              </div>
            )}
          </div>
        )}

        <h1 className="heading">{project.name}</h1>

        {project.shortDescription && (
          <p className="description">{project.shortDescription}</p>
        )}

        {!project.finishedSteps && <RequiredStepsForm project={project} />}

        {project.finishedSteps && (
          <ProjectDetails project={project} user={project.user} />
        )}
      </article>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { Project, User } from "@prisma/client";

import { EyeOffIcon, HammerIcon } from "lucide-react";

export function ProjectCard({
  project,
  user,
}: {
  project: Project;
  user: User;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="card hover:bg-muted/50 cursor-pointer"
    >
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

      <h2 className="title">{project.name}</h2>

      {project.shortDescription && (
        <p className="description line-clamp-2">{project.shortDescription}</p>
      )}

      <p className="text-sm text-muted-foreground">
        {user.username ?? user.emailAddress}
      </p>
    </article>
  );
}

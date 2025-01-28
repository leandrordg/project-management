"use client";

import { useRouter } from "next/navigation";

import { Project, User } from "@prisma/client";

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
      <h2 className="title">{project.name}</h2>
      <p className="description line-clamp-2">{project.shortDescription}</p>
      <p className="text-sm text-muted-foreground">
        @{user.username ?? user.fullName}
      </p>
    </article>
  );
}

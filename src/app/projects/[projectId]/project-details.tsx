import Link from "next/link";

import { Project, User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { GithubIcon, UserRoundSearchIcon } from "lucide-react";

export function ProjectDetails({
  project,
  user,
}: {
  project: Project;
  user: User;
}) {
  return (
    <section className="flex flex-col gap-4">
      <p className="heading">Descrição completa</p>

      <p className="description">{project.description}</p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {project.repositoryUrl && (
          <Button variant="outline" asChild>
            <Link href={project.repositoryUrl} target="_blank">
              <GithubIcon />
              Visitar repositório
            </Link>
          </Button>
        )}

        <Button variant="outline" asChild>
          <Link href={`/users/${user.userId}`}>
            <UserRoundSearchIcon />
            Ver perfil do autor
          </Link>
        </Button>
      </div>
    </section>
  );
}

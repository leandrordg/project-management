import Image from "next/image";
import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import { Project, User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { GithubIcon, PenIcon } from "lucide-react";

export async function ProjectDetails({
  project,
  user,
}: {
  project: Project;
  user: User;
}) {
  const { userId } = await auth();

  return (
    <section className="flex flex-col gap-4">
      <p className="heading">Descrição completa</p>

      <p className="description">{project.description}</p>

      {userId === project.userId && (
        <Button asChild>
          <Link href={`/edit/project/${project.id}`}>
            <PenIcon />
            Editar projeto
          </Link>
        </Button>
      )}

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
            <Image
              src={user.avatar!}
              alt={user.username ?? user.emailAddress}
              width={64}
              height={64}
              className="size-4 rounded-full border bg-muted"
            />
            Ver perfil de {user.username ?? user.emailAddress}
          </Link>
        </Button>
      </div>
    </section>
  );
}

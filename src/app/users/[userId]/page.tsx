import Image from "next/image";

import { getUserById } from "@/hooks/users";
import { cn, formatDate } from "@/lib/utils";

import { ProjectCard } from "@/components/project-card";
import { CalendarIcon, InfoIcon, PenIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

export default async function IndividualUserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId: currentUserId } = await auth();

  const { userId } = await params;

  const user = await getUserById(userId);

  return (
    <main className="max-w-4xl mx-auto md:p-4 space-y-4">
      <article className="card">
        <Image
          src={user.avatar!}
          alt={user.username ?? user.emailAddress}
          width={128}
          height={128}
          className="size-8 md:size-16 rounded-full border"
        />

        <div>
          <h1 className="heading">{user.fullName}</h1>
          <p className="description">{user.username ?? user.emailAddress}</p>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarIcon className="size-4 shrink-0" />
          Membro desde: {formatDate(user.createdAt, { dateStyle: "medium" })}
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {user.userId === currentUserId ? (
            <Button variant="outline">
              <PenIcon />
              Editar perfil
            </Button>
          ) : (
            <Button variant="outline">
              <SendIcon />
              Enviar mensagem
            </Button>
          )}
        </div>
      </article>

      <section className="space-y-4">
        {!user.projects.length && (
          <article className={cn("card flex-row items-center gap-3")}>
            <InfoIcon className="size-4 text-muted-foreground" />
            <p className="description">Nenhum projeto encontrado.</p>
          </article>
        )}

        {user.projects.map((project) => (
          <ProjectCard key={project.id} project={project} user={user} />
        ))}
      </section>
    </main>
  );
}

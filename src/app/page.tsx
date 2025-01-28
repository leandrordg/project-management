import Link from "next/link";

import { userStorageVerification } from "@/hooks/users";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import { GalleryVerticalEndIcon, UserRoundSearchIcon } from "lucide-react";

export default async function HomePage() {
  const { userId } = await auth();

  await userStorageVerification();

  return (
    <main className="max-w-4xl mx-auto md:p-4 space-y-4">
      <div className="card">
        <SignedIn>
          <Button variant="secondary" asChild>
            <SignOutButton>Sair</SignOutButton>
          </Button>
        </SignedIn>
        <SignedOut>
          <Button variant="secondary" asChild>
            <SignInButton mode="modal">Entrar</SignInButton>
          </Button>
        </SignedOut>
      </div>

      <article className="card">
        <h1 className="heading">Vamos começar</h1>

        <p className="description">
          Crie um novo projeto para compartilhar com a comunidade.
        </p>

        <Button asChild>
          <Link href="/create/project">Iniciar</Link>
        </Button>
      </article>

      <article className="card">
        <h1 className="heading">Projetos da comunidade</h1>

        <p className="description">
          Veja todos os projetos públicos na plataforma.
        </p>

        <Button variant="secondary" asChild>
          <Link href="/projects">
            <GalleryVerticalEndIcon />
            Visualizar
          </Link>
        </Button>
      </article>

      <SignedIn>
        <article className="card">
          <h1 className="heading">Meus projetos</h1>

          <p className="description">
            Veja todos os seus projetos cadastrados na plataforma.
          </p>

          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild>
              <Link href={`/users/${userId}/projects`}>
                <GalleryVerticalEndIcon />
                Visualizar
              </Link>
            </Button>

            <Button variant="secondary" asChild>
              <Link href={`/users/${userId}`}>
                <UserRoundSearchIcon />
                Meu perfil
              </Link>
            </Button>
          </div>
        </article>
      </SignedIn>
    </main>
  );
}

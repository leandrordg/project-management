import Link from "next/link";

import { userStorageVerification } from "@/hooks/users";

import { Button } from "@/components/ui/button";

export default async function HomePage() {
  await userStorageVerification();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <article className="card">
        <h1 className="heading">Vamos começar</h1>

        <p className="description">Adicione um novo card do seu projeto.</p>

        <Button variant="secondary" asChild>
          <Link href="/create/project">Iniciar</Link>
        </Button>
      </article>
    </main>
  );
}

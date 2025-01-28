import { CreateProjectForm } from "./form";

export default function CreateProjectPage() {
  return (
    <main className="max-w-4xl mx-auto md:p-4">
      <article className="card">
        <h1 className="heading">Criar um novo projeto</h1>

        <CreateProjectForm />
      </article>
    </main>
  );
}

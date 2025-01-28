import { getProjectById } from "@/hooks/projects";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function IndividualProjectPage({ params }: Props) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  return (
    <main className="max-w-4xl mx-auto p-4">
      <article className="card">
        <h1 className="heading">{project?.name}</h1>
        <p className="short-description">
          {project?.createdAt.toLocaleString("pt-BR", {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </p>
      </article>
    </main>
  );
}

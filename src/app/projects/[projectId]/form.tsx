"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateProjectById } from "./actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  shortDescription: z.string().min(1, "Campo obrigatório"),
  description: z.optional(z.string()),
  repositoryUrl: z.string().min(1, "Campo obrigatório").url("URL inválida"),
  isPublic: z.boolean(),
});

export function FinishProjectRequiredSteps({ project }: { project: Project }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shortDescription: project.shortDescription ?? "",
      description: project.description ?? "",
      repositoryUrl: project.repositoryUrl ?? "",
      isPublic: project.isPublic,
    },
  });

  const projectId = project.id;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateProjectById(projectId, values);
      toast.success("Projeto atualizado com sucesso!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o projeto!");
    }
  }

  const { isSubmitting, isValid, isDirty } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição curta</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o projeto de forma resumida"
                  className="max-h-24"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição completa (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Fale sobre o projeto. Quais os objetivos? Quais as tecnologias utilizadas? Como foi o desenvolvimento?"
                  className="max-h-48"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A descrição completa será exibida somente na página do projeto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repositoryUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do repositório</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Digite a URL do repositório do GitHub"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ao preencher, usaremos mais informações do seu repositório para
                exibir no projeto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormLabel className="space-y-0">Projeto público</FormLabel>
              </div>
              <FormDescription>
                Projetos públicos são exibidos na página inicial.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid || isSubmitting || !isDirty}>
          {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Avançar"}
        </Button>
      </form>
    </Form>
  );
}

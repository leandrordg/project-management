"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createProject } from "./actions";

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
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
});

export function CreateProjectForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const project = await createProject(values);
      toast.success("Projeto criado com sucesso!");
      router.push(`/projects/${project.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar o projeto!");
    }
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do projeto</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nome do projeto"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                O nome do projeto é utilizado para identificá-lo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Avançar"}
        </Button>
      </form>
    </Form>
  );
}

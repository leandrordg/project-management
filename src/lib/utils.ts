import { clsx, type ClassValue } from "clsx";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  return date.toLocaleString("pt-BR", options);
}

export function formatAgoDate(date: Date) {
  return formatDistance(date, new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
}

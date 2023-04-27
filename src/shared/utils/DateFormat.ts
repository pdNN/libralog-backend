import { sub } from "date-fns";
import { format } from "date-fns-tz";

export const newDate = (): Date => {
  const utcDate = sub(new Date(), { hours: 3 });

  return utcDate;
};

export const formatDate = (date?: any): Date | undefined => {
  const utcDate =
    date !== undefined
      ? new Date(new Date(date).toISOString().replace(".000Z", ""))
      : undefined;

  return utcDate;
};

export function formatDateWithHour(date: string | Date): string {
  const formattedDate = formatDate(date);

  return formattedDate
    ? format(formattedDate, "dd/MM/yyyy HH:mm", {
        timeZone: "America/Sao_Paulo",
      })
    : "";
}

export function formatBRDate(date: string | Date): string {
  const formattedDate = formatDate(date);

  return formattedDate ? format(formattedDate, "dd/MM/yyyy") : "";
}

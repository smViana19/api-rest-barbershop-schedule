import { isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export function parseAndValidateBRDate(date: string): Date {
  const dateFormat = 'dd/MM/yyyy';
  const parsedDate = parse(date, dateFormat, new Date(), { locale: ptBR })

  if (!isValid(parsedDate)) {
    throw new Error("Data inválida, use o formato 01/01/2000");
  }
  return parsedDate
}

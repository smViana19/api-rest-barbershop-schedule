import { format } from "date-fns"

export const formatTime = (hours: number, minutes: number): string => {
  const date = new Date(0, 0, 0, hours, minutes);
  return format(date, "HH:mm");
}
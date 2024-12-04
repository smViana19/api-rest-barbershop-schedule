export function validateTime(time: string): string {
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
  if (!timeRegex.test(time)) {
    throw new Error("Hora inválida");
  }
  const [hours, minutes, seconds] = time.split(':').map(Number);

  if (hours < 0 || hours > 23) {
    throw new Error("As horas devem ser entre 00 e 23");
  }
  if (minutes < 0 || minutes > 59) {
    throw new Error("Os minutos devem ser entre 0 e 59");
  }
  if (seconds < 0 || seconds > 59) {
    throw new Error("Os segundos devem ser entre 0 e 59");
  }

  return time;
}
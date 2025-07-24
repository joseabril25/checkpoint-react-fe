export const getDateToday = () => {
  return new Date().toLocaleDateString("en-NZ", {
    weekday: "long",
    month: "short", 
    day: "numeric",
    year: "numeric",
  });
}

export const formatDate = (dateInput: string | Date) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export const getDateToday = () => {
  return new Date().toLocaleDateString("en-NZ", {
    weekday: "long",
    month: "short", 
    day: "numeric",
    year: "numeric",
  });
}
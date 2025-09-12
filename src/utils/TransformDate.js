export function TransformDate(date) {
  const formattedDate = new Date(date).toLocaleString();
  return formattedDate.slice(0, formattedDate.length - 3);
}

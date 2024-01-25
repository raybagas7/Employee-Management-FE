export const formatDate = (date: number | string) => {
  const dateFormat = new Date(date);
  const year = dateFormat.getFullYear();
  const month = dateFormat.getMonth() + 1;
  const day = dateFormat.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

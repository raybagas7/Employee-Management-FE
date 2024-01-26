export const formatDate = (date: number | string) => {
  const dateFormat = new Date(date);
  const year = dateFormat.getFullYear();
  const month = dateFormat.getMonth() + 1;
  const day = dateFormat.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

export const formatTimes = (timestamp: string) => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

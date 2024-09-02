export const apiUrl = 'https://ticketup.skynet.kg:3000/api/';

export const formatDate = (date: string, showTime?: boolean) => {
  const newDate = new Date(date);
  const pad = (num: number, size: number) => num.toString().padStart(size, '0');
  
  const year = newDate.getFullYear();
  const month = pad(newDate.getMonth() + 1, 2);
  const day = pad(newDate.getDate(), 2);
  const hours = pad(newDate.getHours(), 2);
  const minutes = pad(newDate.getMinutes(), 2);
  
  return `${day}.${month}.${year}${showTime ? ` ${hours}:${minutes}` : ''}`;
};

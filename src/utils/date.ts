export const formatDate = (dateString: string): string => {
  const safeDateString = dateString.replace(' ', 'T'); // chuẩn ISO 8601
  const date = new Date(safeDateString);

  if (Number.isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getHourFromDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString.replace(' ', 'T'));
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', hour12: false, minute: '2-digit' });
};

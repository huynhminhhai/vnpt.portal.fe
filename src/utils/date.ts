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

  // ép chuỗi thành UTC
  const date = new Date(dateString.replace(' ', 'T') + 'Z');

  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(date);
};

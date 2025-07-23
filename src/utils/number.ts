import { isNaN } from 'lodash-es';

export const formatCurrencyVN = (value?: number | string): string => {
  const number = Number(value ?? 0);
  return isNaN(number) ? '0' : number.toLocaleString('vi-VN');
};

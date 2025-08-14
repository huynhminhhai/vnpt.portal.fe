import { isNaN } from 'lodash-es';

export const formatCurrencyVN = (value?: number | string): string => {
  const number = Number(value ?? 0);
  return isNaN(number) ? '0' : number.toLocaleString('vi-VN');
};

export function toHostname(input: string): string {
  if (!input) return "";
  let s = input.trim();

  // Nếu thiếu protocol (http/https/...), tạm thêm để URL parser hoạt động
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(s)) {
    s = "http://" + s;
  }

  try {
    const u = new URL(s);
    let host = u.hostname.toLowerCase();
    if (host.startsWith("www.")) host = host.slice(4); // bỏ www.
    return host; // ví dụ: "bochiso.vnpt.me"
  } catch {
    // Fallback đơn giản nếu URL constructor fail (chuỗi quá “lạ”)
    return s
      .replace(/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//, "")
      .replace(/^www\./, "")
      .split(/[/?#]/)[0]  // cắt path/query/hash
      .split(":")[0]      // bỏ port
      .toLowerCase();
  }
}

/**
 * Helper khusus untuk menangani session di skenario Subdomain/Microservices.
 */

export const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  
  // Ambil domain utama (misal: dragonwaterpark.com) untuk mengizinkan cross-subdomain
  // Jika localhost, biarkan kosong.
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const domain = hostname === 'localhost' ? '' : `; domain=.${hostname.split('.').slice(-2).join('.')}`;
  
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/${domain}; samesite=lax`;
};

export const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  return null;
};

export const removeCookie = (name: string) => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const domain = hostname === 'localhost' ? '' : `; domain=.${hostname.split('.').slice(-2).join('.')}`;
  
  document.cookie = `${name}=; path=/${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

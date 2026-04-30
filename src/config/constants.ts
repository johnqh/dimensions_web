export const CONSTANTS = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Dimensions',
  APP_DOMAIN: import.meta.env.VITE_APP_DOMAIN || 'dimensions.cam',
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'Sudobility',
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || 'info@sudobility.com',
  APP_STORE_URL: 'https://apps.apple.com/app/dimensions/id0000000000',
} as const;

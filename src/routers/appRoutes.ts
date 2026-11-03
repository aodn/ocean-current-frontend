export const APP_ROUTES = {
  HOME: '/',
  PRODUCT: '/product',
  MAP: '/map',
  ABOUT: '/about',
  INFO: '/info',
  NEWS: '/news',
  NOT_FOUND: '/404',
  COMING_SOON: '/coming-soon',
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

export const APP_ROUTES = {
  HOME: '/',
  PRODUCT: '/product',
  MAP: '/map',
  ABOUT: '/about',
  NEWS: '/news',
  NOT_FOUND: '/404',
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

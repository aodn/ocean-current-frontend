import { breakpoints } from '../../../src/styles/screens.ts';

export interface Viewport {
  name: string;
  width: number;
  height: number;
}

export const NAVBAR_VIEWPORTS: Viewport[] = [
  { name: 'tablet', width: breakpoints.md, height: 800 },
  { name: 'lg', width: breakpoints.lg, height: 800 },
  { name: 'xl', width: breakpoints.xl, height: 800 },
];

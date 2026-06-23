export interface Viewport {
  name: string;
  width: number;
  height: number;
}

export const NAVBAR_VIEWPORTS: Viewport[] = [
  { name: 'tablet', width: 900, height: 800 },
  { name: 'lg', width: 1024, height: 800 },
  { name: 'xl', width: 1280, height: 800 },
];

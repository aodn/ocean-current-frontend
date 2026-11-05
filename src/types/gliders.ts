import type { BoundingBox } from '@/types/map';

/** One deployment rectangle on a published yearmap (`/resource/api/gliders-yearmaps.json`). */
export interface GliderDeployment {
  mission_name: string;
  /** Selection rectangle on the source image: [left, top, right, bottom] in pixels. */
  pixel_rect: [number, number, number, number];
  /** Geographic bounds as [west, south, east, north]; null when the bounds could not be verified. */
  bbox: BoundingBox | null;
  /** Legacy mission page path, relative to the resource server, e.g. `/gliders/<mission>_4d/latest.html`. */
  url: string;
}

export interface GliderYearmap {
  /** e.g. `2026_sl_temp_04d_nrt` */
  id: string;
  year: number;
  platform: 'sg' | 'sl';
  variable: string;
  window: string;
  is_nrt: boolean;
  deployments: GliderDeployment[];
}

export interface GliderYearmapsResponse {
  schema_version: number;
  maps: GliderYearmap[];
}

export interface GliderDeploymentProperties {
  id: string;
  label: string;
}

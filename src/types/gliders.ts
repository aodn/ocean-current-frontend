import type { BoundingBox } from '@/types/map';

export type GliderDataMode = 'nrt' | 'delayed';

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

/** Fields used by the mission page; IDs retain the published processing version. */
export interface GliderMission {
  id: string;
  mission_name: string;
  /** Published processing mode; older cached catalogue entries may omit it. */
  is_nrt?: boolean;
  start_date?: string | null;
  end_date?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  duration_days?: number | null;
  distance_travelled_km?: number | null;
  glider_id?: string | null;
  processing_version?: string | null;
  temperature_salinity_url?: string | null;
  scientific_data_url?: string | null;
  visualisations: {
    details?: GliderProductLink[] | null;
    animations?: GliderProductLink[] | null;
    latest_images?: Partial<Record<string, string | null>> | null;
  };
}

export interface GliderProductLink {
  label: string;
  url: string;
}

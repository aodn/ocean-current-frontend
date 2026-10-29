export interface GliderMission {
  mission_name: string;
  latitude: number | null;
  longitude: number | null;
}

export interface GliderMissionFilters {
  platform: 'sg' | 'sl';
  year: string;
  mode: 'nrt' | 'delayed';
}

export interface GliderDeploymentProperties {
  id: string;
  label: string;
}

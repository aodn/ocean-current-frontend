export interface ProductMenuBarProps {
  setShowVideo: (state: boolean) => void;
  setShowMap: (state: boolean) => void;
  showVideo?: boolean;
  showMap?: boolean;
  isMapView?: boolean;
  mode?: 'range' | 'list';
}

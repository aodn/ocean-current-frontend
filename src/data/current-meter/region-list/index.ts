import aust from './aust';
import kim from './kim';
import timorP from './timorP';
import row from './row';
import sa from './sa';

export const currentMeterRegionAreasMap = {
  aust,
  kim,
  timorP,
  row,
  sa,
};

export const currentMeterRegionAreasArray = Object.values(currentMeterRegionAreasMap).flat();

import { LocalKey, StateKey } from '@/types/region';
import { pickRandomElements } from '@/utils/math-utils/math';
import { fullLocalList, fullStateList } from './regionList';

/**
 * This file contains the region exception data.
 * for giving product and sub-product,  the region exception data will be used to determine the regions that are not available for the given product and sub-product.
 */

type RegionException = {
  // TODO: this key type should be valid product key
  [key: string]: {
    localException: LocalKey[];
    stateException: StateKey[];
  };
};

export const regionException: RegionException = {
  'fourHourSst-sstFilled': {
    localException: [],
    stateException: [...fullStateList], // fourHour product is not available for all state level
  },
  'fourHourSst-sst': {
    localException: [],
    stateException: [...fullStateList], // fourHour product is not available for all state level
  },
  'fourHourSst-sstAge': {
    localException: [],
    stateException: [...fullStateList], // fourHour product is not available for all state level
  },
  adjustedSeaLevelAnomaly: {
    localException: pickRandomElements<LocalKey>([...fullLocalList], 5), // TODO: this is fake data, need to be updated
    stateException: pickRandomElements<StateKey>([...fullStateList], 3), // TODO: this is fake data, need to be updated
  },
  oceanColour: {
    localException: pickRandomElements<LocalKey>([...fullLocalList], 5), // TODO: this is fake data, need to be updated
    stateException: pickRandomElements<StateKey>([...fullStateList], 3), // TODO: this is fake data, need to be updated
  },
};

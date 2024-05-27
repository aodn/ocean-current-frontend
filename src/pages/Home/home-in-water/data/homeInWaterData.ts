import ArgoFloat from '@/assets/icons/products/in-water/argo-float.svg';
import OceanGlider from '@/assets/icons/products/in-water/ocean-glider.svg';
import SealCTD from '@/assets/icons/products/in-water/seal-ctd.svg';
import CurrentMeters from '@/assets/icons/products/in-water/current-meters.svg';
import AUVIcon from '@/assets/icons/products/in-water/auv.svg';
import ShipOfOpportunity from '@/assets/icons/products/in-water/ship-of-opportunity.svg';
import Satellite from '@/assets/icons/products/in-water/satellite.svg';
import { HomeInWaterType } from '../types/homeInWater.types';

export const homeInWaterData: HomeInWaterType[] = [
  { name: 'Argo Float', icon: ArgoFloat, path: '/product/argo?wmoid=6902985&cycle=192&depth=1&date=20240421' },
  { name: 'Ocean Glider', icon: OceanGlider, path: '/product/argo?wmoid=6902985&cycle=192&depth=1&date=20240421' },
  { name: 'SealCTD', icon: SealCTD, path: '/product/argo?wmoid=6902985&cycle=192&depth=1&date=20240421' },
  { name: 'Current Meters', icon: CurrentMeters, path: '/product/argo?wmoid=6902985&cycle=192&depth=1&date=20240421' },
  { name: 'AUV', icon: AUVIcon, path: '/product/argo?wmoid=6902985&cycle=192&depth=1&date=20240421' },
  {
    name: 'Ships of Opportunity',
    icon: ShipOfOpportunity,
    path: '/product/argo?wmoid=6902985&cycle=192&depth=1&date=20240421',
  },
  { name: 'Satellite', icon: Satellite, path: '/product/argo?wmoid=6902985&cycle=192&depth=1&date=20240421' },
];

import { CurrentMeterRegion } from '@/types/currentMeters';
import aust from './aust';
import timorP from './timorP';
import kim from './kim';
import row from './row';
import pil from './pil';
import ning from './ning';
import perth from './perth';
import esp from './esp';
import sa from './sa';
import totten from './totten';
import sofs from './sofs';
import polynya from './polynya.ts';
import eTas from './eTas';
import bmp from './bmp';
import syd from './syd';
import coffs from './coffs';
import seq from './seq';
import sgbr from './sgbr';
import sgbr2 from './sgbr2';
import cgbr from './cgbr';
import ngbr from './ngbr';

export const currentMeterRegionAreasMap = {
  [CurrentMeterRegion.Aust]: aust,
  [CurrentMeterRegion.TimorP]: timorP,
  [CurrentMeterRegion.Kim]: kim,
  [CurrentMeterRegion.Row]: row,
  [CurrentMeterRegion.Pil]: pil,
  [CurrentMeterRegion.Ning]: ning,
  [CurrentMeterRegion.Perth]: perth,
  [CurrentMeterRegion.Esp]: esp,
  [CurrentMeterRegion.SA]: sa,
  [CurrentMeterRegion.Totten]: totten,
  [CurrentMeterRegion.SOFS]: sofs,
  [CurrentMeterRegion.Polynya]: polynya,
  [CurrentMeterRegion.ETas]: eTas,
  [CurrentMeterRegion.BMP]: bmp,
  [CurrentMeterRegion.Syd]: syd,
  [CurrentMeterRegion.Coffs]: coffs,
  [CurrentMeterRegion.SEQ]: seq,
  [CurrentMeterRegion.SGBR]: sgbr,
  [CurrentMeterRegion.SGBR2]: sgbr2,
  [CurrentMeterRegion.CGBR]: cgbr,
  [CurrentMeterRegion.NGBR]: ngbr,
};

export const currentMeterRegionAreasArray = Object.values(currentMeterRegionAreasMap).flat();

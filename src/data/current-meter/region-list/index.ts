import { CurrentMetersRegion } from '@/types/currentMeters';
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

export const currentMetersRegionAreasMap = {
  [CurrentMetersRegion.Aust]: aust,
  [CurrentMetersRegion.TimorP]: timorP,
  [CurrentMetersRegion.Kim]: kim,
  [CurrentMetersRegion.Row]: row,
  [CurrentMetersRegion.Pil]: pil,
  [CurrentMetersRegion.Ning]: ning,
  [CurrentMetersRegion.Perth]: perth,
  [CurrentMetersRegion.Esp]: esp,
  [CurrentMetersRegion.SA]: sa,
  [CurrentMetersRegion.Totten]: totten,
  [CurrentMetersRegion.SOFS]: sofs,
  [CurrentMetersRegion.Polynya]: polynya,
  [CurrentMetersRegion.ETas]: eTas,
  [CurrentMetersRegion.BMP]: bmp,
  [CurrentMetersRegion.Syd]: syd,
  [CurrentMetersRegion.Coffs]: coffs,
  [CurrentMetersRegion.SEQ]: seq,
  [CurrentMetersRegion.SGBR]: sgbr,
  [CurrentMetersRegion.SGBR2]: sgbr2,
  [CurrentMetersRegion.CGBR]: cgbr,
  [CurrentMetersRegion.NGBR]: ngbr,
};

export const currentMetersRegionAreasArray = Object.values(currentMetersRegionAreasMap).flat();

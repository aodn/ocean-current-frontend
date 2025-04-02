import { RegionScope } from '@/constants/region';
import { LocalRegion, NationRegion, NationBigRegion, Region, StateRegion } from '@/types/map';
import { convertOldOceanCurrentCoordsToBBox } from '@/utils/geo-utils/geo';

const nationRegions: NationRegion[] = [{ code: 'Au', title: 'Australia/NZ', coords: [100, 180, -48, -4.5] }].map(
  (region) => ({ ...region, scope: RegionScope.Au }) as NationRegion,
);

const nationBigRegion: NationBigRegion[] = [{ code: 'ht', title: 'Australia', coords: [70.5, 179.5, -55, 8] }].map(
  (region) => ({ ...region, scope: RegionScope.Ht }) as NationBigRegion,
);

const stateRegions: StateRegion[] = [
  { code: 'SE', title: 'South East', coords: [145, 162.5, -45, -24.5] },
  { code: 'SW', title: 'South West', coords: [101, 125, -40, -20] },
  { code: 'NE', title: 'North East', coords: [142, 160, -27, -7] },
  { code: 'NW', title: 'North West', coords: [101.1, 132, -25, -5] },
  { code: 'GAB', title: 'South', coords: [120, 150, -46, -30] },
  { code: 'SO', title: 'Southern Ocean', coords: [130, 155, -55, -35] },
  { code: 'NZ', title: 'New Zealand', coords: [160, 180, -50, -30] },
  { code: 'Antarctica', title: 'Antarctica', coords: [-180, 180, -80, -60] },
].map((region) => ({ ...region, scope: RegionScope.State }) as StateRegion);

const stateMonthlyMeansRegions: StateRegion[] = [
  ...stateRegions.map((region) => ({
    code: `${region.code}_mm`,
    title: `${region.title} MM`,
    coords: region.coords,
  })),
  { code: 'SLA30d', title: 'Monthly mean SLA', coords: [101, 160, -20, -10] },
  { code: 'SST30d', title: 'Monthly mean SST', coords: [101, 160, -45, -35] },
].map((region) => ({ ...region, scope: RegionScope.State }) as StateRegion);

const localRegions: LocalRegion[] = [
  { code: 'Adelaide', title: 'Adelaide-Melbourne', coords: [135, 147, -44, -33] },
  { code: 'AlbEsp', title: 'Albany-Esperance', coords: [114, 125, -38.5, -33] },
  { code: 'Bass', title: 'Bass Strait', coords: [143, 151, -42, -37] },
  { code: 'Bris-Newc', title: 'Brisbane-Newcastle', coords: [151, 159, -33, -23] }, // only code that won't be used to build url, this is handled in ProductContent
  { code: 'Brisbane', title: 'Brisbane', coords: [152, 156, -29.5, -24.5] }, // only code that won't be used to build url, this is handled in ProductContent
  { code: 'Bris-Syd', title: 'Brisbane-Sydney', coords: [150.6, 157.5, -34.4, -27] },
  { code: 'Broome', title: 'Broome', coords: [115.6, 126, -21.2, -13.7] },
  { code: 'CGBR', title: 'Central GBR', coords: [145, 153, -21.2, -14.5] },
  { code: 'Coffs', title: 'Coffs Harbour', coords: [152.6, 154.9, -31.4, -29.6] },
  { code: 'CLeeu', title: 'Cape Leeuwin', coords: [110, 117.9, -38, -30.1] },
  { code: 'Dongara', title: 'Dongara', coords: [111.3, 115.6, -30.1, -27.1] },
  { code: 'DonPer', title: 'Dongara-Perth', coords: [112, 116.3, -33.1, -30.1] },
  { code: 'EGAB', title: 'Eastern GAB', coords: [128.2, 137.5, -36.9, -31.3] },
  { code: 'Fiji', title: 'Fiji', coords: [176.0, 180.0, -20.0, -15.0] },
  { code: 'Forster', title: 'Forster', coords: [150.8, 155, -34.3, -31] },
  { code: 'GoC', title: 'Gulf of Carpentaria', coords: [132, 143, -18, -8] },
  { code: 'Indo', title: 'Indonesia', coords: [110, 130, -13, -4] },
  { code: 'JBGulf', title: 'JBGulf', coords: [127.0, 133.0, -15.6, -10.0] },
  { code: 'Kimberley', title: 'Kimberley', coords: [118.6, 127, -18.2, -11.7] },
  { code: 'LordHoweS', title: 'Lord Howe Is.-Sydney', coords: [150, 161, -36, -29.8] },
  { code: 'NewCal', title: 'NewCal', coords: [162.5, 169.8, -24, -18] },
  { code: 'NGBR', title: 'Northern GBR', coords: [141, 151.5, -15.2, -7.5] },
  { code: 'Ningaloo', title: 'Ningaloo', coords: [110, 117, -27, -20] },
  { code: 'NingLeeu', title: 'Ningaloo-Leeuwin', coords: [109.2 - 1.0, 116.6, -34.5, -21] },
  { code: 'NZNI', title: 'New Zealand North', coords: [170.0, 180.0, -42.0, -33.0] },
  { code: 'NZSI', title: 'New Zealand South', coords: [164.0, 177.0, -48.0, -39.0] },
  { code: 'NWS', title: 'NW shelf', coords: [112, 119, -23.5, -18] },
  { code: 'Perth', title: 'Perth', coords: [109.2, 116.9, -34.8, -26] },
  { code: 'PNGSol', title: 'PNGSol', coords: [140, 165, -14, 0] },
  { code: 'RechEyre', title: 'Esperance-Eyre Pen.', coords: [124, 136.5, -38.1, -31.3] },
  { code: 'Rottnest', title: 'Rottnest Is.', coords: [114.4, 116.2, -33.1, -31.6] },
  { code: 'Rowley', title: 'Rowley', coords: [116, 124, -21, -14] },
  { code: 'RowleyAtolls', title: 'RowleyAtolls', coords: [118.5, 120.5, -18.5, -16.5] },
  { code: 'SAgulfs', title: 'SA gulfs', coords: [134, 141.3, -39.5, -34.2] },
  { code: 'ScottMore', title: 'ScottMore', coords: [121.5, 124.0, -14.5, -11.3] },
  { code: 'SGBR', title: 'Southern GBR', coords: [148.9, 157, -26, -20] },
  { code: 'SGoC', title: 'SGoC', coords: [135.3, 141.8, -18, -12.5] },
  { code: 'SNSW', title: 'Southern NSW', coords: [149.5, 155.5, -37.4, -31.6] },
  { code: 'Solomon', title: 'Solomon', coords: [154, 163, -12.5, -4.7] },
  { code: 'Syd-Hob', title: 'Sydney-Hobart', coords: [147, 156.5, -44, -33] },
  { code: 'Tas', title: 'Tasmania', coords: [141, 152, -47, -40] },
  { code: 'TasE', title: 'Tasmania-east', coords: [144.5, 153, -45.6, -40] },
  { code: 'TasSE', title: 'Tasmania-SE', coords: [145.5, 149, -44.6, -42] },
  { code: 'TimorP', title: 'Timor Passage-Darwin', coords: [122.6, 132.6, -14.5, -7.5] },
  { code: 'TopEnd', title: 'TopEnd', coords: [133, 138, -13, -10] },
  { code: 'Torres', title: 'Torres', coords: [139.5, 144.5, -13, -9] },
  { code: 'Vanuatu', title: 'Vanuatu', coords: [163, 173, -21, -12] },
  { code: 'XmasI', title: 'Christmas Is.', coords: [100, 110, -12, -5] },

  // Tidal Currents specific regions
  { code: 'Aust', title: 'Australia', coords: [102, 165, -48, -4.5] },
  { code: 'Banks', title: 'Banks', coords: [147.4, 149, -41, -40] },
  { code: 'Bass-td', title: 'Bass', coords: [143, 151, -42, -37] },
  { code: 'CGBR-td', title: 'CGBR', coords: [145, 153, -21.2, -14.5] },
  { code: 'SGBR-td', title: 'SGBR', coords: [148.9, 157, -26, -20] },
  { code: 'PPB', title: 'PPB', coords: [143.5, 146, -39, -37.5] },
  { code: 'HydrogPass', title: 'HydrogPass', coords: [147.5, 150.2, -21.5, -19.2] },
  { code: 'Darwin', title: 'Darwin', coords: [128.5, 133.3, -13.5, -10] },
  { code: 'KingSound', title: 'KingSound', coords: [121.7, 126, -17.5, -13.5] },
  { code: 'Arnhem', title: 'Arnhem', coords: [126.5, 135, -15.5, -8.3] },
  { code: 'GOC', title: 'GOC', coords: [132, 143, -18, -8] },
  { code: 'SA', title: 'SA', coords: [133.2, 141, -38, -32] },
  { code: 'Pilbara', title: 'Pilbara', coords: [110.5, 122, -27.5, -17.8] },

  // Current Meters specific regions
  { code: '01_Aust', title: 'Australia', coords: [102, 165, -48, -4.5] },
  { code: '02_TimorP', title: 'TimorP', coords: [122.6, 132.6, -14.5, -7.5] },
  { code: '03_Kim', title: 'Kim', coords: [119.5, 125.5, -18.5, -13.5] },
  { code: '23_Row', title: 'Row', coords: [116, 124, -21, -16] },
  { code: '04_Pil', title: 'Pil', coords: [112.5, 118.5, -22.4, -18] },
  { code: '05_Ning', title: 'Ning', coords: [111.1, 116.8, -24.2, -19.8] },
  { code: '06_Perth', title: 'Perth', coords: [113, 118, -34.2, -29.7] },
  { code: '07_Esp', title: 'Esp', coords: [119.3, 124.7, -36.4, -31.7] },
  { code: '08_SA', title: 'SA', coords: [133.2, 139, -37.5, -33] },
  { code: '17_Totten', title: 'Totten', coords: [116, 124, -68, -64.9] },
  { code: '19_SOFS', title: 'SOFS', coords: [138.5, 144.5, -48.5, -44.5] },
  { code: '18_Polynya', title: 'Polynya', coords: [139, 147.5, -67.8, -64.7] },
  { code: '09_ETas', title: 'ETas', coords: [145.3, 151, -44.7, -40.3] },
  { code: '22_BMP', title: 'BMP', coords: [147, 153.5, -38.5, -34.2] },
  { code: '10_Syd', title: 'Syd', coords: [148.5, 154.5, -36.5, -31.5] },
  { code: '11_Coffs', title: 'Coffs', coords: [150.5, 156, -32.5, -28] },
  { code: '12_SEQ', title: 'SEQ', coords: [151, 157.5, -29.2, -25] },
  { code: '13_SGBR', title: 'SGBR', coords: [148.7, 154.2, -25.6, -21.3] },
  { code: '14_SGBR2', title: 'SGBR2', coords: [150.8, 155, -22.5, -19.3] },
  { code: '15_CGBR', title: 'CGBR', coords: [145, 150, -21.2, -16.5] },
  { code: '16_NGBR', title: 'NGBR', coords: [142.8, 148.5, -16.7, -12.2] },

  // SealCTD specific regions
  { code: 'GAB-Seal', title: 'GAB', coords: [131.2, 141, -39, -31] },
  { code: 'NSW', title: 'NSW', coords: [148.5, 156.5, -38.4, -31.2] },
].map((region) => ({ ...region, scope: RegionScope.Local }) as LocalRegion);

const allRegions: Region[] = [
  ...nationRegions,
  ...stateRegions,
  ...localRegions,
  ...stateMonthlyMeansRegions,
  ...nationBigRegion,
].map((region) => ({
  ...region,
  coords: convertOldOceanCurrentCoordsToBBox(region.coords),
}));
export { nationRegions, stateRegions, localRegions, allRegions, stateMonthlyMeansRegions, nationBigRegion };

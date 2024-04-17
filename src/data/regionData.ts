import { LocalRegion, NationRegion, Region, StateRegion } from '@/types/map';

const nationRegions: NationRegion[] = [{ region: 'Au', title: 'Australia/NZ', coords: [100.5, 179.5, -49, -5.5] }];

const stateRegions: StateRegion[] = [
  { region: 'SE', title: 'South East', coords: [145, 162.5, -45, -24.5] },
  { region: 'SW', title: 'South West', coords: [101, 125, -40, -20] },
  { region: 'NE', title: 'North East', coords: [142, 160, -27, -7] },
  { region: 'NW', title: 'North West', coords: [101.1, 132, -25, -5] },
  { region: 'GAB', title: 'South', coords: [120, 150, -46, -30] },
  { region: 'SO', title: 'Southern Ocean', coords: [130, 155, -55, -35] },
  { region: 'NZ', title: 'New Zealand', coords: [160, 180, -50, -30] },
];

const localRegions: LocalRegion[] = [
  { region: 'Fiji', title: 'Fiji', coords: [176.0, 180.0, -20.0, -15.0] },
  { region: 'JBGulf', title: 'JBGulf', coords: [127.0, 133.0, -15.6, -10.0] },
  { region: 'RowleyAtolls', title: 'RowleyAtolls', coords: [118.5, 120.5, -18.5, -16.5] },
  { region: 'ScottMore', title: 'ScottMore', coords: [121.5, 124.0, -14.5, -11.3] },
  { region: 'TopEnd', title: 'TopEnd', coords: [133, 138, -13, -10] },
  { region: 'SGoC', title: 'SGoC', coords: [135.3, 141.8, -18, -12.5] },
  { region: 'Torres', title: 'Torres', coords: [139.5, 144.5, -13, -9] },
  { region: 'Solomon', title: 'Solomon', coords: [154, 163, -12.5, -4.7] },
  { region: 'Vanuatu', title: 'Vanuatu', coords: [163, 173, -21, -12] },
  { region: 'NewCal', title: 'NewCal', coords: [162.5, 169.8, -24, -18] },
  { region: 'Forster', title: 'Forster', coords: [150.8, 155, -34.3, -31] },
  { region: 'TimorP', title: 'Timor Passage-Darwin', coords: [122.6, 132.6, -14.5, -7.5] },
  { region: 'Bass', title: 'Bass Strait', coords: [143, 151, -42, -37] },
  { region: 'Rowley', title: 'Rowley', coords: [116, 124, -21, -14] },
  { region: 'Kimberley', title: 'Kimberley', coords: [118.6, 127, -18, -11.7] },
  { region: 'XmasI', title: 'Christmas Is.', coords: [100, 110, -12, -5] },
  { region: 'NWS', title: 'NW shelf', coords: [112, 119, -23.5, -18] },
  { region: 'Ningaloo', title: 'Ningaloo', coords: [110, 117, -27, -20] },
  { region: 'Rottnest', title: 'Rottnest Is.', coords: [114.4, 116.2, -33.1, -31.6] },
  { region: 'DonPer', title: 'Dongara-Perth', coords: [112, 116.3, -33.1, -30.1] },
  { region: 'Dongara', title: 'Dongara', coords: [111.3, 115.6, -30.1, -27.1] },
  { region: 'Perth', title: 'Perth', coords: [109.2, 116.9, -34.8, -26] },
  { region: 'CLeeu', title: 'Cape Leeuwin', coords: [110, 117.9, -38, -30.1] },
  { region: 'SAgulfs', title: 'SA gulfs', coords: [134, 141.3, -39.5, -34.2] },
  { region: 'EGAB', title: 'Eastern GAB', coords: [128.2, 137.5, -36.9, -31.3] },
  { region: 'RechEyre', title: 'Esperance-Eyre Pen.', coords: [124, 136.5, -38.1, -31.3] },
  { region: 'Adelaide', title: 'Adelaide-Melbourne', coords: [135, 147, -44, -33] },
  { region: 'Coffs', title: 'Coffs Harbour', coords: [152.6, 154.9, -31.4, -29.6] },
  { region: 'SNSW', title: 'Southern NSW', coords: [149.5, 155.5, -37.4, -31.6] },
  { region: 'Brisbane2', title: 'Brisbane', coords: [152, 156, -29.5, -24.5] },
  { region: 'Bris-Syd', title: 'Brisbane-Sydney', coords: [150.6, 157.5, -34.4, -27] },
  { region: 'SGBR', title: 'Southern GBR', coords: [148.9, 157, -26, -20] },
  { region: 'CGBR', title: 'Central GBR', coords: [145, 153, -21.2, -14.5] },
  { region: 'NGBR', title: 'Northern GBR', coords: [141, 151.5, -15.2, -7.5] },
  { region: 'PNGSol', title: 'PNGSol', coords: [140, 165, -14, 0] },
  { region: 'Brisbane', title: 'Brisbane-Newcastle', coords: [151, 159, -33, -23] },
  { region: 'LordHoweS', title: 'Lord Howe Is.-Sydney', coords: [150, 161, -36, -29.8] },
  { region: 'TasSE', title: 'Tasmania-SE', coords: [145.5, 149, -44.6, -42] },
  { region: 'TasE', title: 'Tasmania-east', coords: [144.5, 153, -45.6, -40] },
  { region: 'Syd-Hob', title: 'Sydney-Hobart', coords: [147, 156.5, -44, -33] },
  { region: 'Tas', title: 'Tasmania', coords: [141, 152, -47, -40] },
  { region: 'AlbEsp', title: 'Albany-Esperance', coords: [114, 125, -38.5, -33] },
  { region: 'GoC', title: 'Gulf of Carpentaria', coords: [132, 143, -18, -8] },
  { region: 'Indo', title: 'Indonesia', coords: [110, 130, -13, -4] },
  { region: 'NingLeeu', title: 'Ningaloo-Leeuwin', coords: [109.2 - 1.0, 116.6, -34.5, -21] },
  { region: 'NZNI', title: 'New Zealand North', coords: [170.0, 180.0, -42.0, -33.0] },
  { region: 'NZSI', title: 'New Zealand South', coords: [164.0, 177.0, -48.0, -39.0] },
];

const allRegions: Region[] = [...nationRegions, ...stateRegions, ...localRegions];

export { nationRegions, stateRegions, localRegions, allRegions };

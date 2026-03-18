import { ImageTag } from '@/types/argo';
import { parseImageTagsFromText } from './argoTag';

describe('parseImageTagsFromText', () => {
  it('should parse valid Argo tag data correctly', () => {
    const input = `
      Argo    10.5          20.3     1234567 100    Germán R1234567_100.nc

      Argo    595.32252     97.86582 5905470 146    csiro  R5905470_146.nc

      SOOP    459.80500    306.88858 M/VHarbourMaster          XPJ6VHP
    `;

    const expected: ImageTag[] = [
      {
        type: 'Argo',
        coordX: 10.5,
        coordY: 20.3,
        wmoId: 1234567,
        cycle: 100,
        institution: 'Germán',
        dataSource: 'R1234567_100.nc',
      },
      {
        type: 'Argo',
        coordX: 595.32252,
        coordY: 97.86582,
        wmoId: 5905470,
        cycle: 146,
        institution: 'csiro',
        dataSource: 'R5905470_146.nc',
      },
      {
        type: 'SOOP',
        coordX: 459.805,
        coordY: 306.88858,
        shipName: 'M/VHarbourMaster',
      },
    ];

    const result = parseImageTagsFromText(input);
    expect(result).toEqual(expected);
  });

  it('should ignore invalid lines', () => {
    const input = `
      Argo    384.59935    537.99536 5905642 214     aoml  R5905642_214.nc

      Invalid line
      Argo    452.50503    182.53633 5905513 079    csiro  R5905513_079.nc

      SOOP    459.80500    306.88858 M/VHarbourMaster          XPJ6VHP
      Another invalid line
    `;

    const expected: ImageTag[] = [
      {
        type: 'Argo',
        coordX: 384.59935,
        coordY: 537.99536,
        wmoId: 5905642,
        cycle: 214,
        institution: 'aoml',
        dataSource: 'R5905642_214.nc',
      },
      {
        type: 'Argo',
        coordX: 452.50503,
        coordY: 182.53633,
        wmoId: 5905513,
        cycle: 79,
        institution: 'csiro',
        dataSource: 'R5905513_079.nc',
      },
      {
        type: 'SOOP',
        coordX: 459.805,
        coordY: 306.88858,
        shipName: 'M/VHarbourMaster',
      },
    ];

    const result = parseImageTagsFromText(input);
    expect(result).toEqual(expected);
  });

  it('should return an empty array for empty input', () => {
    const input = '';
    const result = parseImageTagsFromText(input);
    expect(result).toEqual([]);
  });

  it('should ignore lines with insufficient data', () => {
    const input = `
      Argo 10.5 20.3 1234567 100 INSTITUTION_A
      Argo -5.2 15.7 7654321 200 INSTITUTION_B SOURCE_B
    `;

    const expected: ImageTag[] = [
      {
        type: 'Argo',
        coordX: -5.2,
        coordY: 15.7,
        wmoId: 7654321,
        cycle: 200,
        institution: 'INSTITUTION_B',
        dataSource: 'SOURCE_B',
      },
    ];

    const result = parseImageTagsFromText(input);
    expect(result).toEqual(expected);
  });

  it('should parse valid SOOP entries', () => {
    const input = `
      SOOP    477.26928    430.93647   RVInvestigator              NRT
      SOOP    480.90726    428.31465   RVInvestigator              NRT
    `;

    const expected: ImageTag[] = [
      { type: 'SOOP', coordX: 477.26928, coordY: 430.93647, shipName: 'RVInvestigator' },
      { type: 'SOOP', coordX: 480.90726, coordY: 428.31465, shipName: 'RVInvestigator' },
    ];

    const result = parseImageTagsFromText(input);
    expect(result).toEqual(expected);
  });

  it('should ignore SOOP lines with fewer than 4 parts', () => {
    const input = `
      SOOP    477.26928    430.93647
      SOOP    480.90726    428.31465   RVInvestigator
    `;

    const expected: ImageTag[] = [{ type: 'SOOP', coordX: 480.90726, coordY: 428.31465, shipName: 'RVInvestigator' }];

    const result = parseImageTagsFromText(input);
    expect(result).toEqual(expected);
  });

  it('should parse mixed Argo and SOOP lines', () => {
    const input = `
      SOOP    477.26928    430.93647   RVInvestigator              NRT
      Argo    571.57824     71.45243 5905612 005    csiro  R5905612_005.nc
    `;

    const expected: ImageTag[] = [
      { type: 'SOOP', coordX: 477.26928, coordY: 430.93647, shipName: 'RVInvestigator' },
      {
        type: 'Argo',
        coordX: 571.57824,
        coordY: 71.45243,
        wmoId: 5905612,
        cycle: 5,
        institution: 'csiro',
        dataSource: 'R5905612_005.nc',
      },
    ];

    const result = parseImageTagsFromText(input);
    expect(result).toEqual(expected);
  });
});

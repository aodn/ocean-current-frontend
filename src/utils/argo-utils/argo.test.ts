import { describe, it, expect } from 'vitest';
import { ArgoProfile } from '@/types/argo';
import { convertHtmlToArgo } from './argo';

// TODO: write tests for not mocked functions
vi.mock('../geo-utils/geo', () => ({
  calculateOffsetByCoords: (coords: number[]) => coords,
}));

describe('convertHtmlToArgo', () => {
  it('should convert HTML to ArgoProfile array correctly', () => {
    const htmlInput = `<map name="imap">
      <area shape="rect" coords="34 152 39 158" href="../1902055/20240910_1902055_153.html" target="_blank" alt="1902055">
      <area shape="rect" coords="570 167 575 173" href="../3902358/20240910_3902358_60.html" target="_blank" alt="3902358">
    </map>`;

    const expectedOutput: ArgoProfile[] = [
      {
        coords: [34, 152, 39, 158],
        worldMeteorologicalOrgId: '1902055',
        cycle: '153',
        depth: '0',
        date: '20240910',
      },
      {
        coords: [570, 167, 575, 173],
        worldMeteorologicalOrgId: '3902358',
        cycle: '60',
        depth: '0',
        date: '20240910',
      },
    ];

    const result = convertHtmlToArgo(htmlInput);

    expect(result).toEqual(expectedOutput);
    expect(result).toHaveLength(2);
  });

  it('should handle empty HTML input', () => {
    const htmlInput = '';
    const result = convertHtmlToArgo(htmlInput);

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('should handle HTML input with no area elements', () => {
    const htmlInput = '<map name="imap"></map>';
    const result = convertHtmlToArgo(htmlInput);

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('should handle malformed HTML input gracefully', () => {
    const htmlInput =
      '<map name="imap"><area shape="rect" coords="invalid" href="../1234567/20240910_1234567_123.html"></map>';

    expect(() => convertHtmlToArgo(htmlInput)).not.toThrow();
  });
});

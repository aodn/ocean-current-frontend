import { describe, it, expect } from 'vitest';
import { createTagsObjArray } from './tidalCurrents';

// Helper function to create a mock RegExpStringIterator
function createMockIterator(matches: [string, string][]): RegExpStringIterator<RegExpExecArray> {
  return matches[Symbol.iterator]() as RegExpStringIterator<RegExpExecArray>;
}

describe('createTagsObjArray', () => {
  it('should correctly parse a single match with title, alt, coords, and href', () => {
    const matches = createMockIterator([
      [
        '<area shape="rect" coords="237  179  253  196" href="../../monthplots/CSIRO_28064_202503.html" alt="17cm/s -121T +3cm/s rms + 7cm/s -42T. ARA-GOC87 57m" title="17cm/s -121T +3cm/s rms + 7cm/s -42T. ARA-GOC87 57m" target="_blank"',
        'shape="rect" coords="237  179  253  196" href="../../monthplots/CSIRO_28064_202503.html" alt="17cm/s -121T +3cm/s rms + 7cm/s -42T. ARA-GOC87 57m" title="17cm/s -121T +3cm/s rms + 7cm/s -42T. ARA-GOC87 57m" target="_blank"',
      ],
    ]);

    const result = createTagsObjArray(matches);
    expect(result).toEqual([
      {
        name: '17cm/s -121T +3cm/s rms + 7cm/s -42T. ARA-GOC87 57m',
        coords: [237, 179, 253, 196],
        shape: 'rect',
        href: '../../monthplots/CSIRO_28064_202503.html',
        alt: '17cm/s -121T +3cm/s rms + 7cm/s -42T. ARA-GOC87 57m',
        type: 'point',
      },
    ]);
  });

  it('should correctly parse multiple matches', () => {
    const matches = createMockIterator([
      [
        '<area shape="rect" coords="415  473  431  490" href="../../monthplots/CSIRO_28068_202503.html" alt="10cm/s -36T +3cm/s rms + 2cm/s -2T. ARA-GOC87 60m" title="10cm/s -36T +3cm/s rms + 2cm/s -2T. ARA-GOC87 60m"',
        'shape="rect" coords="415  473  431  490" href="../../monthplots/CSIRO_28068_202503.html" alt="10cm/s -36T +3cm/s rms + 2cm/s -2T. ARA-GOC87 60m" title="10cm/s -36T +3cm/s rms + 2cm/s -2T. ARA-GOC87 60m"',
      ],
      [
        '<area shape="rect" coords="252  107  269  124" href="../../monthplots/CSIRO_28072_202503.html" alt="17cm/s -142T +2cm/s rms + 3cm/s 61T. ARA-GOC87 47m" title="17cm/s -142T +2cm/s rms + 3cm/s 61T. ARA-GOC87 47m"',
        'shape="rect" coords="252  107  269  124" href="../../monthplots/CSIRO_28072_202503.html" alt="17cm/s -142T +2cm/s rms + 3cm/s 61T. ARA-GOC87 47m" title="17cm/s -142T +2cm/s rms + 3cm/s 61T. ARA-GOC87 47m"',
      ],
    ]);

    const result = createTagsObjArray(matches);
    expect(result).toEqual([
      {
        name: '10cm/s -36T +3cm/s rms + 2cm/s -2T. ARA-GOC87 60m',
        coords: [415, 473, 431, 490],
        shape: 'rect',
        href: '../../monthplots/CSIRO_28068_202503.html',
        alt: '10cm/s -36T +3cm/s rms + 2cm/s -2T. ARA-GOC87 60m',
        type: 'point',
      },
      {
        name: '17cm/s -142T +2cm/s rms + 3cm/s 61T. ARA-GOC87 47m',
        coords: [252, 107, 269, 124],
        shape: 'rect',
        href: '../../monthplots/CSIRO_28072_202503.html',
        alt: '17cm/s -142T +2cm/s rms + 3cm/s 61T. ARA-GOC87 47m',
        type: 'point',
      },
    ]);
  });

  it('should ignore the target attribute', () => {
    const matches = createMockIterator([
      [
        '<area shape="rect" coords="771   41  788   58" title="-103cm Daru" target="_blank"',
        'shape="rect" coords="771   41  788   58" title="-103cm Daru" target="_blank"',
      ],
    ]);

    const result = createTagsObjArray(matches);
    expect(result).toEqual([{ name: '-103cm Daru', coords: [771, 41, 788, 58], shape: 'rect', type: 'point' }]);
  });

  it('should handle empty input gracefully', () => {
    const matches = createMockIterator([]);
    const result = createTagsObjArray(matches);
    expect(result).toEqual([]);
  });
});

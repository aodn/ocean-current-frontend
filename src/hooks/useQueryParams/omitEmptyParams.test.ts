import { describe, it, expect } from 'vitest';
import omitEmptyParams from './omitEmptyParams';

describe('omitEmptyParams', () => {
  it('drops empty-string, null, and undefined values', () => {
    expect(
      omitEmptyParams({
        keep: 'value',
        dropEmpty: '',
        dropNull: null,
        dropUndefined: undefined,
      }),
    ).toEqual({ keep: 'value' });
  });

  it('returns an empty object when every value is empty or nullish', () => {
    expect(omitEmptyParams({ a: '', b: null, c: undefined })).toEqual({});
  });

  it('preserves all keys when every value is a non-empty string', () => {
    const params = { region: '01_Aust', depth: '1', property: 'vrms', date: '0000' };
    expect(omitEmptyParams(params)).toEqual(params);
  });

  it('treats whitespace-only strings as non-empty', () => {
    expect(omitEmptyParams({ note: ' ' })).toEqual({ note: ' ' });
  });

  it('returns an empty object for empty input', () => {
    expect(omitEmptyParams({})).toEqual({});
  });

  it('does not mutate the input object', () => {
    const params = { keep: 'value', drop: '' };
    omitEmptyParams(params);
    expect(params).toEqual({ keep: 'value', drop: '' });
  });
});

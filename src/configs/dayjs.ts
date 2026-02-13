import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

// Override toString to prevent accidental UTC conversion.
// Default .toString() calls Date.toUTCString() which shifts the date.
// This ensures .toString(), template literals, and string concatenation
// all return local time — consistent with .format().
const proto = dayjs.prototype as { toString: () => string; format: (f?: string) => string };
proto.toString = function () {
  return this.format();
};

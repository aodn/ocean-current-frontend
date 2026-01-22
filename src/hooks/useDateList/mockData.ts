import dayjs, { Dayjs } from 'dayjs';
import { DateFormat, DateItem } from '@/types/date';
import { RegionScope } from '@/constants/region';
import { getUnitByFormat } from '@/utils/date-utils/date';
import { ProductID } from '@/types/product';

interface MockConfig {
  productId: ProductID;
  interVal?: {
    local?: 1 | 4;
    state: 1 | 2 | 4 | 6;
  };
  startDate?: string;
  endDateLogic?: 'default' | 'day-15-cutoff';
}

const MOCK_CONFIGS: MockConfig[] = [
  {
    productId: 'fourHourSst-sstFilled',
    interVal: {
      local: 4,
      state: 4,
    },
  },
  {
    productId: 'fourHourSst-sst',
    interVal: {
      local: 4,
      state: 4,
    },
  },
  {
    productId: 'fourHourSst-sstAge',
    interVal: {
      local: 4,
      state: 4,
    },
  },
  {
    productId: 'surfaceWaves-wave',
    interVal: {
      state: 2,
    },
  },
  {
    productId: 'monthlyMeans-30day',
    startDate: '199301', // January 1993 hardcoded on the server
    endDateLogic: 'day-15-cutoff',
  },
];

export const generateDateRange = (
  productId: ProductID,
  dateFormat: DateFormat,
  scope: RegionScope,
  endDateOverride?: Dayjs,
): DateItem[] => {
  const mockConfig = MOCK_CONFIGS.find((c) => c.productId === productId);
  const interval = scope === RegionScope.Local ? mockConfig?.interVal?.local || 1 : mockConfig?.interVal?.state || 1;

  let startDate;
  const today = dayjs();

  let endDate = today;
  if (mockConfig?.endDateLogic === 'day-15-cutoff') {
    // If day >= 15, use current month; if day < 15, use previous month
    endDate = today.date() >= 15 ? today : today.subtract(1, 'month');
  }

  if (endDateOverride) {
    endDate = endDateOverride;
  }

  if (mockConfig?.startDate) {
    startDate = dayjs(mockConfig.startDate, dateFormat);
  } else {
    startDate = dayjs().subtract(50, getUnitByFormat(dateFormat));
  }

  const dates: DateItem[] = [];

  let currentDate = startDate;

  const shouldGenerateAllDates = !!(mockConfig?.startDate && mockConfig?.endDateLogic);

  while ((shouldGenerateAllDates || dates.length < 100) && !currentDate.isAfter(endDate)) {
    if (dateFormat === DateFormat.HOUR) {
      if (currentDate.hour() % interval === 0) {
        dates.push({
          date: currentDate.format(dateFormat),
        });
      }
    } else {
      dates.push({
        date: currentDate.format(dateFormat),
      });
    }
    currentDate = currentDate.add(1, getUnitByFormat(dateFormat));
  }

  return Array.from(new Map(dates.map((item) => [item.date, item])).values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
};

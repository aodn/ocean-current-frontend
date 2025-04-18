import dayjs from 'dayjs';
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
    productId: 'surfaceWaves',
    interVal: {
      state: 2,
    },
  },
];

export const generateDateRange = (productId: ProductID, dateFormat: DateFormat, scope: RegionScope): DateItem[] => {
  const mockConfig = MOCK_CONFIGS.find((c) => c.productId === productId);
  const interval = scope === RegionScope.Local ? mockConfig?.interVal?.local || 1 : mockConfig?.interVal?.state || 1;
  const centerDate = dayjs();
  const dates: DateItem[] = [];
  const today = dayjs();

  for (let i = -50; dates.length < 100; i++) {
    const currentDate = centerDate.add(i, getUnitByFormat(dateFormat));

    if (currentDate.isAfter(today)) {
      break;
    }

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
  }

  return Array.from(new Map(dates.map((item) => [item.date, item])).values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
};

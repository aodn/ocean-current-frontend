export enum DateFormat {
  SECOND = 'YYYYMMDDHHmmss',
  MINUTE = 'YYYYMMDDHHmm',
  HOUR = 'YYYYMMDDHH',
  DAY = 'YYYYMMDD',
  MONTH = 'YYYYMM',
  MONTH_ONLY = 'MM',
  YEAR_ONLY = 'YYYY',
}

export interface DateConfig {
  localFormat: DateFormat | null;
  stateFormat: DateFormat | null;
}

export enum DateUnit {
  Minute = 'minute',
  Hour = 'hour',
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export interface DateItem {
  date: string;
}

export interface OceanColourDateItem extends DateItem {
  path?: string; // For ocean colour images that may have year folders
}

export type SliderDateItem = {
  date: Date;
  active: boolean;
  showLabel: boolean;
};

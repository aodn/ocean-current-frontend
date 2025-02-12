export enum DateFormat {
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
  Hour = 'hour',
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export interface DateItem {
  date: string;
}

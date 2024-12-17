export enum DateFormat {
  Hour = 'YYYYMMDDHH',
  Day = 'YYYYMMDD',
  Month = 'YYYYMM',
  MonthOnly = 'MM',
  Year = 'YYYY',
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

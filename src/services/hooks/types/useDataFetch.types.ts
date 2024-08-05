import { AxiosResponse } from 'axios';
import { Dayjs } from 'dayjs';

export type ApiArgs = Array<string | number | Dayjs | null | undefined>;

export type FetchFunction<T, Args extends ApiArgs> = (...args: Args) => Promise<AxiosResponse<T>>;

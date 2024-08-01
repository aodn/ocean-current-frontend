export interface News {
  id: number;
  title: string;
  author: string;
  content: string;
  imageUrl: string;
  date: string;
}

export type NewsCardLayout =
  | 'horizontal'
  | 'date-title-content'
  | 'title-content-date'
  | 'title-image-content'
  | 'image-title-content';

import React from 'react';
import { News } from '../../types/homeNews.types';
import Title from './components/Title';
import Author from './components/Author';
import Content from './components/Content';
import Date from './components/Date';

interface DateTitleContentProps {
  news: News;
}
const DateTitleContent: React.FC<DateTitleContentProps> = ({ news: { title, author, content, date } }) => {
  return (
    <div className="flex h-full w-full flex-col rounded-xl border bg-white p-6 shadow">
      <div className="flex justify-end">
        <Date date={date} />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex h-1/2 flex-col justify-between">
          <Title title={title} />
          <Author author={author} />
        </div>
        <div className="h-1/2">
          <Content content={content} />
        </div>
      </div>
    </div>
  );
};

export default DateTitleContent;

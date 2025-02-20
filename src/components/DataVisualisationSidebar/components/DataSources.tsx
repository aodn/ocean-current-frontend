import React from 'react';
import { Button } from '@/components/Shared';
import { DataSourcesProps } from '../types';

const DataSources: React.FC<DataSourcesProps> = ({ filteredDataSources }) => {
  return (
    <>
      {filteredDataSources.map(({ title, link }, index) => (
        <div key={title} className={index === filteredDataSources.length - 1 ? 'w-auto' : 'flex-1'}>
          <a target="_blank" href={link} rel="noreferrer">
            <Button size="full" borderRadius="small" type="secondary" className="!border">
              <span className="text-base text-imos-text-grey">{title}</span>
            </Button>
          </a>
        </div>
      ))}
    </>
  );
};

export default DataSources;

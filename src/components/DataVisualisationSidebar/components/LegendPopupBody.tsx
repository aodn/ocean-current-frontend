import React from 'react';
import { LegendItem } from '@/constants/productLegends';

interface LegendPopupBodyProps {
  legendItems: LegendItem[];
}

const LegendPopupBody: React.FC<LegendPopupBodyProps> = ({ legendItems }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Legend Details</h2>
      {legendItems.map((item, index) => {
        if (!item.label && !item.description) return null;
        const keyBase = item.label ?? (typeof item.description === 'string' ? item.description : 'legend-item');
        return (
          <div key={`${keyBase}-popup-${index}`} className="mt-2 flex items-start">
            {item.shape && <div className="mt-1 mr-2 flex shrink-0 items-center justify-center">{item.shape}</div>}
            <div>
              {item.label ? (
                <>
                  <span className="text-imos-dark-grey mr-1 font-bold">{item.label}: </span>
                  <span className="text-imos-dark-grey">{item.description ?? item.label.toLowerCase()}</span>
                </>
              ) : (
                <span className="text-imos-dark-grey">{item.description}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LegendPopupBody;

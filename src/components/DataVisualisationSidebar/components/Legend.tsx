import React, { useState } from 'react';
import { Button, Popup } from '@/components/Shared';
import { LegendItem } from '@/constants/productLegends';
import LegendPopupBody from './LegendPopupBody';

interface LegendProps {
  legendItems?: LegendItem[] | null;
  title?: string;
}

const Legend: React.FC<LegendProps> = ({ legendItems, title = 'Legend' }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (!legendItems || legendItems.length === 0) {
    return null;
  }

  const sidebarItems = legendItems.filter((item) => item.shape !== undefined);

  return (
    <div className="pb-4">
      <div className="mt-2 mb-6 grid grid-cols-2 gap-x-1 gap-y-4 px-3">
        {sidebarItems.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center">
            <div className="mr-3 flex shrink-0 items-center justify-center">{item.shape}</div>
            <span className="text-imos-dark-grey">{item.label}</span>
          </div>
        ))}
      </div>
      <Button onClick={handlePopup} size="full" borderRadius="small" type="secondary">
        <span className="text-imos-dark-grey">Click for more information</span>
      </Button>

      <Popup
        title={title}
        body={() => <LegendPopupBody legendItems={legendItems} />}
        isOpen={isPopupOpen}
        onClose={handlePopup}
      />
    </div>
  );
};

export default Legend;

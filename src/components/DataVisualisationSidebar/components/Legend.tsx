import React, { useState } from 'react';
import { Button, Popup } from '@/components/Shared';
import { LegendItem } from '@/constants/productLegends';

interface LegendProps {
  legendItems?: LegendItem[] | null;
}

const Legend: React.FC<LegendProps> = ({ legendItems }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (!legendItems || legendItems.length === 0) {
    return null;
  }

  const PopupBody = () => {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold">Legend Details</h2>
        {legendItems.map((item, index) => (
          <div key={`${item.label}-popup-${index}`} className="mt-2 flex items-start">
            <div className="mr-2 mt-1 flex shrink-0 items-center justify-center">{item.shape}</div>
            <div>
              <span className="mr-1 font-bold text-imos-dark-grey">{item.label}: </span>
              <span className="text-imos-dark-grey">{item.description || item.label.toLowerCase()}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pb-4">
      <div className="mb-6 mt-2 grid grid-cols-2 gap-x-1 gap-y-4 px-3">
        {legendItems.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center">
            <div className="mr-3 flex shrink-0 items-center justify-center">{item.shape}</div>
            <span className="text-imos-dark-grey">{item.label}</span>
          </div>
        ))}
      </div>
      <Button onClick={handlePopup} size="full" borderRadius="small" type="secondary">
        <span className="text-imos-dark-grey">Click for more information</span>
      </Button>

      <Popup title="Legend" body={PopupBody} isOpen={isPopupOpen} onClose={handlePopup} />
    </div>
  );
};

export default Legend;

import React, { useState } from 'react';
import { Popup, TruncateText } from '@/components/Shared';
import { GeneralText } from '@/constants/textConstant';
import { ArrowWithTailIcon, InfoIcon } from '@/components/Shared/Icons';
import { ProductSummaryProp } from '../types';

const ProductSummary: React.FC<ProductSummaryProp> = ({ productInfo }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  if (!productInfo) return;
  const { title, summary, description } = productInfo;

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const PopupBody = () => {
    return <div className="p-4">{description()}</div>;
  };

  return (
    <>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <InfoIcon className="mr-6 mt-1 flex-shrink-0" color="imos-sea-blue" />
          <TruncateText className="text-imos-nav-text" lines={4} text={summary} />
        </div>

        <div aria-hidden onClick={handlePopup} className="mt-3 flex items-center justify-end">
          <p className="mr-2 cursor-pointer font-semibold text-imos-dark-grey">{GeneralText.READ_MORE}</p>
          <ArrowWithTailIcon className="cursor-pointer" />
        </div>
      </div>

      <Popup title={title} body={PopupBody} isOpen={isPopupOpen} onClose={handlePopup} />
    </>
  );
};

export default ProductSummary;

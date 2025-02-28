import React, { useState } from 'react';
import { Popup, TruncateText } from '@/components/Shared';
import InfoIcon from '@/assets/icons/info-icon.svg';
import ArrowWithTail from '@/assets/icons/ArrowWithTail';
import { GeneralText } from '@/constants/textConstant';
import { color } from '@/styles/colors';
import { ProductSummaryProp } from '../types';

const ProductSummary: React.FC<ProductSummaryProp> = ({ isArgo, productInfo }) => {
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
        <div className="flex justify-between">
          <img src={InfoIcon} alt="info icon" className="mr-6 mt-1 h-6 w-6 object-contain" />
          <TruncateText lines={4} text={summary} />
        </div>
        {!isArgo && (
          <div aria-hidden onClick={handlePopup} className="mt-3 flex justify-end">
            <p className="mr-2 cursor-pointer font-semibold text-imos-grey">{GeneralText.READ_MORE}</p>
            <ArrowWithTail stroke={color.subheadingGrey} className="mt-2 cursor-pointer" />
          </div>
        )}
      </div>

      <Popup title={title} body={PopupBody} isOpen={isPopupOpen} onClose={handlePopup} />
    </>
  );
};

export default ProductSummary;

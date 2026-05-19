import React, { useState } from 'react';
import { Button, Popup, TruncateText } from '@/components/Shared';
import { GeneralText } from '@/constants/textConstant';
import { ArrowWithTailIcon, InfoIcon } from '@/components/Shared/Icons';
import { useProductFromUrl, useUrlType } from '@/hooks';
import { APP_ROUTES } from '@/routers/routes';
import { ProductSummaryProp } from '../types';

const ProductSummary: React.FC<ProductSummaryProp> = ({ productInfo }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const urlType = useUrlType();
  const productFromUrl = useProductFromUrl(urlType);

  if (!productInfo) return null;
  const { title, summary, description, aboutButtonText, aboutDescription } = productInfo;

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const PopupBody = () => {
    return <div className="p-4">{description()}</div>;
  };

  const aboutPath = productFromUrl ? `${APP_ROUTES.ABOUT}/${productFromUrl.mainProduct}` : null;

  return (
    summary &&
    summary.length > 0 && (
      <>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <InfoIcon className="mt-1 mr-6 shrink-0" color="imos-sea-blue" />
            <TruncateText className="text-imos-nav-text" lines={5} text={summary} />
          </div>

          <div aria-hidden onClick={handlePopup} className="mt-3 flex items-center justify-end">
            <p className="text-imos-dark-grey mr-2 cursor-pointer font-semibold">{GeneralText.READ_MORE}</p>
            <ArrowWithTailIcon className="cursor-pointer" />
          </div>

          {aboutButtonText && aboutDescription && aboutPath && (
            <Button
              onClick={() => window.open(aboutPath, '_blank', 'noopener,noreferrer')}
              size="full"
              borderRadius="small"
              type="secondary"
              className="mt-3"
            >
              <span className="text-imos-dark-grey min-w-0 truncate">{aboutButtonText}</span>
            </Button>
          )}
        </div>

        <Popup title={title} body={PopupBody} isOpen={isPopupOpen} onClose={handlePopup} />
      </>
    )
  );
};

export default ProductSummary;

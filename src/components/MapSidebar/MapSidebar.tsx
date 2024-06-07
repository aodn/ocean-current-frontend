import React, { useState } from 'react';
import { TEXT_CONSTANT } from '@/constants/textConstant';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import ProductSideBar from './components/ProductSidebar';
import ArgoSideBar from './components/ArgoSideBar';

const MapSidebar: React.FC = () => {
  const [copyButtonText, setCopyButtonText] = useState<string>(TEXT_CONSTANT.COPY_PERMLINK);
  const { isArgo } = useProductCheck();

  const handleCopyLink = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
    setCopyButtonText('Copied!');

    setTimeout(() => {
      setCopyButtonText(TEXT_CONSTANT.COPY_PERMLINK);
    }, 2000);
  };

  return (
    <>
      {isArgo ? (
        <ArgoSideBar copyButtonText={copyButtonText} handleCopyLink={handleCopyLink} />
      ) : (
        <ProductSideBar copyButtonText={copyButtonText} handleCopyLink={handleCopyLink} />
      )}
    </>
  );
};

export default MapSidebar;

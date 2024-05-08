import React, { useState } from 'react';
import useProductStore from '@/stores/product-store/productStore';
import { TEXT_CONSTANT } from '@/constants/textConstant';
import MiniMap from './components/MiniMap';
import { SidebarProps } from './types/mapSidebar';
import ProductSideBar from './components/ProductSidebar';
import ArgoSideBar from './components/ArgoSideBar';

const MapSidebar: React.FC<SidebarProps> = ({ renderMiniMap }) => {
  const [copyButtonText, setCopyButtonText] = useState<string>(TEXT_CONSTANT.COPY_PERMLINK);
  const useProductParams = useProductStore((state) => state.productParams);

  const isArgo = useProductParams.mainProduct === 'argo';

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

      {renderMiniMap && (
        <div className="mt-4 h-60 w-full overflow-hidden rounded-md">
          <MiniMap />
        </div>
      )}
    </>
  );
};

export default MapSidebar;

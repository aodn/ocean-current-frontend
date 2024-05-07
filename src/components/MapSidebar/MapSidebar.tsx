import React, { useState } from 'react';
import MiniMap from './components/MiniMap';
import { SidebarProps } from './types/mapSidebar';
import ProductSideBar from './components/ProductSidebar';
import ArgoSideBar from './components/ArgoSideBar';

const MapSidebar: React.FC<SidebarProps> = ({ renderMiniMap }) => {
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy Permlink');

  const handleCopyLink = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
    setCopyButtonText('Copied!');

    setTimeout(() => {
      setCopyButtonText('Copy Permlink');
    }, 2000);
  };

  return (
    <>
      {true ? (
        <ProductSideBar copyButtonText={copyButtonText} handleCopyLink={handleCopyLink} />
      ) : (
        <ArgoSideBar copyButtonText={copyButtonText} handleCopyLink={handleCopyLink} />
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

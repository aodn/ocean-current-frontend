import React from 'react';
import useArgoAsProductData from '../../hooks/useArgoAsProductData';
import ArgoAsProductLayerRenderer from './ArgoAsProductLayerRenderer';

interface ArgoAsProductLayerProps {
  isMiniMap: boolean;
  isArgo?: boolean;
}
const ArgoAsProductLayer: React.FC<ArgoAsProductLayerProps> = ({ isMiniMap, isArgo }) => {
  const { argoData } = useArgoAsProductData();

  return <ArgoAsProductLayerRenderer isMiniMap={isMiniMap} argoData={argoData} isArgo={isArgo} />;
};

export default ArgoAsProductLayer;

import React from 'react';
import useArgoAsProductData from '../../hooks/useArgoAsProductData';
import ArgoAsProductLayerRenderer from './ArgoAsProductLayerRenderer';

interface ArgoAsProductLayerProps {
  isMiniMap: boolean;
}
const ArgoAsProductLayer: React.FC<ArgoAsProductLayerProps> = ({ isMiniMap }) => {
  const { argoData } = useArgoAsProductData();

  return <ArgoAsProductLayerRenderer isMiniMap={isMiniMap} argoData={argoData} />;
};

export default ArgoAsProductLayer;

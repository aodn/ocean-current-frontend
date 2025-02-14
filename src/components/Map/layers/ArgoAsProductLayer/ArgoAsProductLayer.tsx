import React from 'react';
import useArgoAsProductData from '../../hooks/useArgoAsProductData';
import ArgoAsProductLayerRenderer from './ArgoAsProductLayerRenderer';

interface ArgoAsProductLayerProps {
  isMiniMap: boolean;
  shouldFitBounds?: boolean;
}
const ArgoAsProductLayer: React.FC<ArgoAsProductLayerProps> = ({ isMiniMap, shouldFitBounds = false }) => {
  const { argoData } = useArgoAsProductData();

  return <ArgoAsProductLayerRenderer isMiniMap={isMiniMap} argoData={argoData} shouldFitBounds={shouldFitBounds} />;
};

export default ArgoAsProductLayer;

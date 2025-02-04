import useProductStore from '@/stores/product-store/productStore';
import { getEntryImagePathByProductId } from '@/utils/data-image-builder-utils/latestEntryImage';
import DataImageLayerRenderer from './DataImageLayerRenderer';

const DataImageLayer: React.FC = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);
  // client requested to use adjusted SLA map for argo product, see https://github.com/aodn/backlog/issues/5575
  const correctProductId = useProductId === 'argo' ? 'adjustedSeaLevelAnomaly-sla' : useProductId;
  const urlPath = getEntryImagePathByProductId(correctProductId);

  if (!urlPath) {
    return null;
  }

  const url = `/api/${urlPath}/latest.gif`;
  return <DataImageLayerRenderer imageUrl={url} productId={useProductId} />;
};

export default DataImageLayer;

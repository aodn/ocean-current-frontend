import useProductStore from '@/stores/product-store/productStore';
import { getEntryImagePathByProductId } from '@/utils/data-image-builder-utils/latestEntryImage';
import DataImageLayerRenderer from './DataImageLayerRenderer';

const DataImageLayer: React.FC = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);
  const urlPath = getEntryImagePathByProductId(useProductId);

  if (!urlPath) {
    return null;
  }

  const url = `/api/${urlPath}/latest.gif`;
  return <DataImageLayerRenderer imageUrl={url} />;
};

export default DataImageLayer;

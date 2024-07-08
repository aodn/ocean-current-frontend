import categoryIcon from '@/assets/icons/category-icon.png';
import { Dropdown, Loading } from '@/components/Shared';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { getProductFullPathById } from '@/utils/product-utils/product';
import { useQueryParams } from '@/hooks';
import { mapNavbarDataElements } from './data/mapNavbar';
import { MapNavBarElement } from './types/mapNavbar.types';

const MapNavbar: React.FC = () => {
  const { updateQueryParamsAndNavigate } = useQueryParams();

  const useProductId = useProductStore((state) => state.productParams.productId);

  const handleDropdownChange = (selectedElement: MapNavBarElement) => {
    if (selectedElement.id === useProductId) {
      return;
    }
    setProductId(selectedElement.id);
    const targetPath = getProductFullPathById(selectedElement.id);
    updateQueryParamsAndNavigate(targetPath);
  };

  if (!useProductId) {
    return <Loading loadingSize="w-10 h-10" />;
  }

  return (
    <div className="relative z-10 flex h-18 justify-between border bg-white p-2 drop-shadow-x0y4">
      <div className="flex items-center">
        <div className="flex p-2">
          <img src={categoryIcon} alt="category logo" />
          <span className="ml-3 text-lg text-imos-sea-blue">Category</span>
        </div>
        <Dropdown elements={mapNavbarDataElements} selectedId={useProductId} onChange={handleDropdownChange} />
      </div>
    </div>
  );
};

export default MapNavbar;

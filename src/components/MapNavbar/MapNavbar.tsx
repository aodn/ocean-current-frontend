import { useNavigate, useSearchParams } from 'react-router-dom';
import categoryIcon from '@/assets/icons/category-icon.png';
import { Dropdown } from '@/components/Shared';
import { RegionScope } from '@/constants/region';
import { setMainProduct, setRegionScope, setSubProduct } from '@/stores/product-store/productStore';
import { getProductByKey } from '@/utils/product';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { mapNavbarDataElements } from './data/mapNavbar';
import RegionSelection from './components/RegionSelection';
import { MapNavBarElement } from './types/mapNavbar.types';

const MapNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const { isRegionRequired } = useProductCheck();

  const handleDropdownChange = (selectedElement: MapNavBarElement) => {
    const product = getProductByKey(selectedElement.id);
    setMainProduct(product.mainProduct.key);
    setSubProduct(product.subProduct?.key || null);
    navigate(product.mainProduct.path);
  };

  const handleRegionChange = (selectedRegion: RegionScope) => {
    setRegionScope(selectedRegion);
    setSearchParams({ regionScope: selectedRegion });
  };

  return (
    <div className="relative z-10 flex h-18 justify-between border bg-white p-2 drop-shadow-x0y4">
      <div className="flex items-center">
        <div className="flex p-2">
          <img src={categoryIcon} alt="category logo" />
          <span className="ml-3 text-lg text-imos-sea-blue">Category</span>
        </div>
        <Dropdown
          elements={mapNavbarDataElements}
          initialSelectedId={mapNavbarDataElements[0].id}
          onChange={handleDropdownChange}
        />
      </div>
      {isRegionRequired && <RegionSelection onChange={handleRegionChange} />}
    </div>
  );
};

export default MapNavbar;

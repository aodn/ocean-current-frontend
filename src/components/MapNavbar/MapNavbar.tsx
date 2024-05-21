import { useNavigate } from 'react-router-dom';
import categoryIcon from '@/assets/icons/category-icon.png';
import { Dropdown, Loading } from '@/components/Shared';
import { setMainProduct, setSubProduct } from '@/stores/product-store/productStore';
import { getProductByKey } from '@/utils/product';
import useMainProductKey from '@/stores/product-store/hooks/useMainProductKey';
import { mapNavbarDataElements } from './data/mapNavbar';
import { MapNavBarElement } from './types/mapNavbar.types';

const MapNavbar: React.FC = () => {
  const navigate = useNavigate();

  const mainProductKey = useMainProductKey();

  const handleDropdownChange = (selectedElement: MapNavBarElement) => {
    const product = getProductByKey(selectedElement.id);
    setMainProduct(product.mainProduct.key);
    setSubProduct(product.subProduct?.key || null);
    navigate(product.mainProduct.path);
  };

  if (!mainProductKey) {
    return <Loading loadingSize="w-10 h-10" />;
  }

  return (
    <div className="relative z-10 flex h-18 justify-between border bg-white p-2 drop-shadow-x0y4">
      <div className="flex items-center">
        <div className="flex p-2">
          <img src={categoryIcon} alt="category logo" />
          <span className="ml-3 text-lg text-imos-sea-blue">Category</span>
        </div>
        <Dropdown elements={mapNavbarDataElements} initialSelectedId={mainProductKey} onChange={handleDropdownChange} />
      </div>
      {/* {isRegionRequired && <RegionSelection onChange={handleRegionChange} />} */}
    </div>
  );
};

export default MapNavbar;

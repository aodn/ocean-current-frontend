import { useNavigate } from 'react-router-dom';
import categoryIcon from '@/assets/icons/category-icon.png';
import { Dropdown, Loading } from '@/components/Shared';
import useProductStore, { setMainProduct, setProductId, setSubProduct } from '@/stores/product-store/productStore';
import { getMainAndSubProductById } from '@/utils/product';
import { mapNavbarDataElements } from './data/mapNavbar';
import { MapNavBarElement } from './types/mapNavbar.types';

const MapNavbar: React.FC = () => {
  const navigate = useNavigate();

  const useProductId = useProductStore((state) => state.productParams.productId);

  const handleDropdownChange = (selectedElement: MapNavBarElement) => {
    setProductId(selectedElement.id);
    const product = getMainAndSubProductById(selectedElement.id);
    setMainProduct(product.mainProduct.key);
    setSubProduct(product.subProduct?.key || null);
    const targetPath = product.subProduct
      ? `${product.mainProduct.path}/${product.subProduct.path}`
      : product.mainProduct.path;
    navigate(targetPath);
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
        <Dropdown elements={mapNavbarDataElements} initialSelectedId={useProductId} onChange={handleDropdownChange} />
      </div>
      {/* {isRegionRequired && <RegionSelection onChange={handleRegionChange} />} */}
    </div>
  );
};

export default MapNavbar;

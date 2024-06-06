import { useNavigate } from 'react-router-dom';
import { Dropdown, Loading } from '@/components/Shared';
import useProductStore, { setMainProduct, setProductId, setSubProduct } from '@/stores/product-store/productStore';
import { getMainAndSubProductById } from '@/utils/product';
import { mapNavbarDataElements } from '@/data/dropDownProductData';
import { MapNavBarElement } from '@/types/dropDownProduct';

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
    <Dropdown
      showIcons
      header
      elements={mapNavbarDataElements}
      selectedId={useProductId}
      onChange={handleDropdownChange}
    />
  );
};

export default MapNavbar;

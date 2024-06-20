import { useNavigate } from 'react-router-dom';
import { Dropdown, Loading } from '@/components/Shared';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { mapNavbarDataElements } from '@/data/dropDownProductData';
import { MapNavBarElement } from '@/types/dropDownProduct';
import { getProductFullPathById } from '@/utils/product';

const HeaderSideBar: React.FC = () => {
  const navigate = useNavigate();

  const useProductId = useProductStore((state) => state.productParams.productId);

  const handleDropdownChange = (selectedElement: MapNavBarElement) => {
    if (selectedElement.id === useProductId) {
      return;
    }
    setProductId(selectedElement.id);

    const targetPath = getProductFullPathById(selectedElement.id);
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

export default HeaderSideBar;

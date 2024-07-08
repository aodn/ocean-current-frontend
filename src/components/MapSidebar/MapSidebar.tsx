import { useNavigate } from 'react-router-dom';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { getProductFullPathById } from '@/utils/product-utils/product';
import { mapNavbarDataElements } from '@/data/dropDownProductData';
import { MapNavBarElement } from '@/types/dropDownProduct';

const MapSidebar: React.FC = () => {
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

  return (
    <div>
      <div className="  w-full rounded-b-md bg-[#EFEFEF] p-4 shadow" data-testid="drop-down-menu">
        {mapNavbarDataElements.map((element) => (
          <div
            key={element.id}
            aria-hidden="true"
            className={`mb-4 flex cursor-pointer items-center rounded-md border border-[#c2c2c2] p-3 duration-300 hover:border-imos-black ${element.id === useProductId ? 'border-[#888888] bg-white' : ''}`}
            onClick={() => handleDropdownChange(element)}
          >
            <img className="mr-4 h-9 w-9" src={element.icon} alt={`${element.label} icon`} />
            <span className="text-left text-base text-imos-grey">{element.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapSidebar;

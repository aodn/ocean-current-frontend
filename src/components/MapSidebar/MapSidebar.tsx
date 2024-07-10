import { useNavigate } from 'react-router-dom';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { getProductFullPathById } from '@/utils/product-utils/product';
import { mapSidebarElements } from '@/data/dropDownProductData';
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
    <div className="h-full w-full overflow-hidden bg-[#DAE3E8] p-4 shadow" data-testid="drop-down-menu">
      {mapSidebarElements.map((element) => (
        <div
          key={element.id}
          aria-hidden="true"
          className={`mb-4 flex cursor-pointer items-center rounded-md border p-3 duration-300 hover:border-imos-black ${element.id === useProductId ? 'bg-[#3A6F8F] text-white' : 'bg-white text-[#787878]'}`}
          onClick={() => handleDropdownChange(element)}
        >
          <img className="mr-4 h-9 w-9" src={element.icon} alt={`${element.label} icon`} />
          <span className="text-left text-base ">{element.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MapSidebar;

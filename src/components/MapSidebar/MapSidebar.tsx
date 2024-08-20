import dayjs from 'dayjs';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import { mapSidebarElements } from '@/data/dropDownProductData';
import { useDateRange, useQueryParams } from '@/hooks';
import { DropdownElement } from '../Shared/Dropdown/types/dropdown.types';

const MapSidebar: React.FC = () => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const { allDates, selectedDateIndex, formatDate } = useDateRange();
  const useProductId = useProductStore((state) => state.productParams.productId);
  const productIdWithoutSubProduct = useProductId.split('-')[0];
  const selectedDate = dayjs(allDates[selectedDateIndex]?.date).format(formatDate);

  const handleProductChange = (selectedElement: DropdownElement) => {
    if (selectedElement.id === useProductId) {
      return;
    }
    setProductId(selectedElement.id);

    const targetPath = getProductPathWithSubProduct(selectedElement.id);
    updateQueryParamsAndNavigate(targetPath, { date: selectedDate });
  };

  return (
    <div className=" w-full overflow-hidden rounded bg-[#fff] p-4 shadow" data-testid="drop-down-menu">
      {mapSidebarElements.map((element) => (
        <div
          key={element.id}
          aria-hidden="true"
          className={`mb-4 flex cursor-pointer items-center rounded-md border border-[#3A6F8F] p-3 duration-300 hover:border-[#52BDEC] ${element.id === productIdWithoutSubProduct ? 'border-[#52BDEC] bg-[#52BDEC80]' : 'bg-white '}`}
          onClick={() => handleProductChange(element)}
        >
          <img className="mr-4 h-9 w-9" src={element.icon} alt={`${element.label} icon`} />
          <span className="text-left text-base text-[#787878]">{element.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MapSidebar;

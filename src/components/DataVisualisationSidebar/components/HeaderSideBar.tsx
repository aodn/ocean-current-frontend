import dayjs from 'dayjs';
import { Dropdown, Loading } from '@/components/Shared';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { mapNavbarDataElements } from '@/data/dropDownProductData';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import { useDateRange, useQueryParams } from '@/hooks';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const HeaderSideBar: React.FC = () => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const useProductId = useProductStore((state) => state.productParams.productId);
  const { mainProduct } = useProductConvert();
  const { allDates, selectedDateIndex, formatDate } = useDateRange();
  const selectedDate = dayjs(allDates[selectedDateIndex]?.date).format(formatDate);

  const handleDropdownChange = (selectedElement: DropdownElement) => {
    if (selectedElement.id === useProductId) {
      return;
    }
    setProductId(selectedElement.id);

    const targetPath = getProductPathWithSubProduct(selectedElement.id);
    updateQueryParamsAndNavigate(targetPath, { date: selectedDate });
  };

  if (!useProductId) {
    return <Loading loadingSize="w-10 h-10" />;
  }

  return (
    <Dropdown
      showIcons
      header
      elements={mapNavbarDataElements}
      selectedId={mainProduct?.key}
      onChange={handleDropdownChange}
    />
  );
};

export default HeaderSideBar;

import dayjs from 'dayjs';
import { Dropdown, Loading } from '@/components/Shared';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { mapNavbarDataElements } from '@/data/dropDownProductData';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import { useDateRange, useQueryParams } from '@/hooks';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';

const SidebarProductDropdown: React.FC = () => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const useProductId = useProductStore((state) => state.productParams.productId);
  const { mainProduct } = useProductConvert();
  const { allDates, selectedDateIndex, formatDate } = useDateRange();
  const selectedDate = dayjs(allDates[selectedDateIndex]?.date).format(formatDate);
  const isProductAvailableInRegion = useProductAvailableInRegion();

  const handleDropdownChange = (selectedElement: DropdownElement) => {
    if (selectedElement.id === useProductId) {
      return;
    }
    setProductId(selectedElement.id);

    let queryToUpdate = { date: selectedDate } as Record<string, string | null>;
    if (!isProductAvailableInRegion) {
      queryToUpdate = { date: selectedDate, region: null };
    }

    const targetPath = getProductPathWithSubProduct(selectedElement.id);
    updateQueryParamsAndNavigate(targetPath, queryToUpdate);
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

export default SidebarProductDropdown;

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

  const handleDropdownChange = ({ id }: DropdownElement) => {
    if (id === useProductId) {
      return;
    }
    setProductId(id);

    let queryToUpdate = { date: selectedDate } as Record<string, string | null>;
    // EAC Mooring Array has data from only one region, we're setting the region automatically so user shouldn't need to manually select the region
    if (id === 'EACMooringArray') {
      queryToUpdate = { date: selectedDate, region: 'Brisbane' };
    }
    if (!isProductAvailableInRegion) {
      queryToUpdate = { date: selectedDate, region: null };
    }

    const targetPath = getProductPathWithSubProduct(id);
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

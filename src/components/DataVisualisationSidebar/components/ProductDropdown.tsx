import dayjs from 'dayjs';
import { Dropdown, Loading } from '@/components/Shared';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import { useDateRange, useQueryParams } from '@/hooks';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import { initialState as currentMetersInitialState } from '@/stores/current-meters-store/currentMeters';
import { QueryParams } from '@/hooks/useQueryParams/types/userQueryParams.types';

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

    let queryToUpdate: QueryParams = { date: selectedDate, property: null, depth: null, cycle: null, wmoid: null };
    // EAC Mooring Array has data from only one region, we're setting the region automatically so user shouldn't need to manually select the region
    if (id === 'EACMooringArray') {
      queryToUpdate = { date: selectedDate, region: 'Brisbane', property: null, depth: null };
    } else if (id === 'currentMeters') {
      const { region, property, depth, date } = currentMetersInitialState;
      queryToUpdate = { date, region, property, depth };
    } else if (!isProductAvailableInRegion) {
      queryToUpdate = { date: selectedDate, region: null, property: null, depth: null, cycle: null, wmoid: null };
    }

    const targetPath = getProductPathWithSubProduct(id);
    updateQueryParamsAndNavigate(targetPath, queryToUpdate);
  };

  if (!useProductId) {
    return <Loading loadingSize="w-10 h-10" />;
  }

  return (
    <div className="mb-1">
      <Dropdown
        showIcons
        header
        elements={sidebarProductsNav}
        selectedId={mainProduct?.key}
        onChange={handleDropdownChange}
      />
    </div>
  );
};

export default SidebarProductDropdown;

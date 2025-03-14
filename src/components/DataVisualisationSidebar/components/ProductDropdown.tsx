import React from 'react';
import dayjs from 'dayjs';
import { Dropdown } from '@/components/Shared';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import { useDateRange, useQueryParams } from '@/hooks';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import { initialState as currentMetersInitialState } from '@/stores/current-meters-store/currentMeters';
import { QueryParams } from '@/hooks/useQueryParams/types/userQueryParams.types';
import { RootProductID } from '@/types/product';
import { ProductDropdownProps } from '../types';

const ProductDropdown: React.FC<ProductDropdownProps> = ({ mainProductKey }) => {
  const { updateQueryParamsAndNavigate } = useQueryParams();

  const { allDates, selectedDateIndex, formatDate } = useDateRange();
  const selectedDate = dayjs(allDates[selectedDateIndex]?.date).format(formatDate);
  const isProductAvailableInRegion = useProductAvailableInRegion();

  const handleDropdownChange = ({ id }: DropdownElement<RootProductID>) => {
    if (mainProductKey.includes(id)) {
      return;
    }

    let queryToUpdate: QueryParams = {
      date: selectedDate,
      property: null,
      depth: null,
      deploymentPlot: null,
      point: null,
    };
    // EAC Mooring Array has data from only one region, we're setting the region automatically so user shouldn't need to manually select the region
    if (id === 'EACMooringArray') {
      queryToUpdate = {
        date: selectedDate,
        region: 'Brisbane',
        property: null,
        depth: null,
        point: null,
        deploymentPlot: null,
      };
    } else if (id === 'currentMeters') {
      const { region, property, depth, date } = currentMetersInitialState;
      queryToUpdate = { date, region, property, depth };
    } else if (!isProductAvailableInRegion) {
      queryToUpdate = {
        date: selectedDate,
        region: null,
        property: null,
        depth: null,
        deploymentPlot: null,
        point: null,
      };
    }

    const targetPath = getProductPathWithSubProduct(id);
    updateQueryParamsAndNavigate(targetPath, queryToUpdate);
  };

  return (
    <Dropdown
      showIcons
      header
      elements={sidebarProductsNav}
      selectedId={mainProductKey as RootProductID}
      onChange={handleDropdownChange}
    />
  );
};

export default ProductDropdown;

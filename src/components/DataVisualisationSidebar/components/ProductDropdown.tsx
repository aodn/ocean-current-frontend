import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown } from '@/components/Shared';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { getProductPathWithSubProduct, getTargetProductIdAfterRouting } from '@/utils/product-utils/product';
import { useDateRange, useQueryParams } from '@/hooks';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import { initialState as currentMetersInitialState } from '@/stores/current-meters-store/currentMeters';
import { QueryParams } from '@/hooks/useQueryParams/types/userQueryParams.types';
import { RootProductID } from '@/types/product';
import useProductStore from '@/stores/product-store/productStore';
import { regionLatestDatesOptions } from '@/services/hooks/useRegionLatestDates';
import { LatestRegionDatesResponse, RegionLatestDate } from '@/types/imageList';
import { ProductDropdownProps } from '../types';

const ProductDropdown: React.FC<ProductDropdownProps> = ({ mainProductKey }) => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState<RootProductID | null>(null);
  const queryClient = useQueryClient();

  const { allDates, selectedDateIndex, formatDate } = useDateRange();

  const selectedDate = dayjs(allDates[selectedDateIndex]?.date).format(formatDate);
  const isProductAvailableInRegion = useProductAvailableInRegion();
  const currentRegionCode = useProductStore((state) => state.productParams.regionCode);

  const dropdownElements = sidebarProductsNav.map((element) => ({
    ...element,
    isLoading: loadingProductId === element.id,
    disabled: isLoading && loadingProductId !== element.id,
  }));

  const handleDropdownChange = async ({ id }: DropdownElement<RootProductID>) => {
    if (mainProductKey.includes(id) || isLoading) {
      return;
    }

    setIsLoading(true);
    setLoadingProductId(id);

    try {
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
      } else {
        try {
          const targetProductId = getTargetProductIdAfterRouting(id);

          const queryOptions = regionLatestDatesOptions(targetProductId);

          let latestDatesData: LatestRegionDatesResponse | undefined =
            queryClient.getQueryData<LatestRegionDatesResponse>(queryOptions.queryKey);

          if (!latestDatesData) {
            latestDatesData = await queryClient.fetchQuery<LatestRegionDatesResponse>(queryOptions);
          }

          const regionLatestDate =
            currentRegionCode && latestDatesData
              ? latestDatesData.regionLatestDates?.find((item: RegionLatestDate) => item.region === currentRegionCode)
                  ?.latestDate
              : null;

          const isDateInPast = regionLatestDate ? dayjs(regionLatestDate).isBefore(dayjs(selectedDate), 'day') : false;

          const dateToUse = isDateInPast ? regionLatestDate : selectedDate;

          queryToUpdate = {
            date: dateToUse,
            property: null,
            depth: null,
            deploymentPlot: null,
            point: null,
          };
        } catch (error) {
          console.error('Failed to fetch latest dates for product:', id, error);
          // Fallback to using the current selected date if the API fails
          queryToUpdate = {
            date: selectedDate,
            property: null,
            depth: null,
            deploymentPlot: null,
            point: null,
          };
        }
      }

      const targetPath = getProductPathWithSubProduct(id);
      updateQueryParamsAndNavigate(targetPath, queryToUpdate);
    } finally {
      setIsLoading(false);
      setLoadingProductId(null);
    }
  };

  return (
    <Dropdown
      showIcons
      header
      elements={dropdownElements}
      selectedId={(mainProductKey === 'sealCtdTags' ? 'sealCtd' : mainProductKey) as RootProductID}
      onChange={handleDropdownChange}
    />
  );
};

export default ProductDropdown;

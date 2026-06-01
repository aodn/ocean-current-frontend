import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown } from '@/components/Shared';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { getProductPathWithSubProduct, getTargetProductIdAfterRouting } from '@/utils/product-utils/product';
import { useQueryParams } from '@/hooks';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import { initialState as currentMetersInitialState } from '@/stores/current-meters-store/currentMeters';
import { QueryParams } from '@/hooks/useQueryParams/types/userQueryParams.types';
import { RootProductID } from '@/types/product';
import useProductStore from '@/stores/product-store/productStore';
import { regionLatestDatesOptions } from '@/services/hooks/useRegionLatestDates';
import { LatestRegionDatesResponse, RegionLatestDate } from '@/types/imageList';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { RegionScope } from '@/constants/region';
import useDateStore from '@/stores/date-store/dateStore';
import { DateFormat } from '@/types/date';
import { ProductDropdownProps } from '../types';

const ProductDropdown: React.FC<ProductDropdownProps> = ({ mainProductKey }) => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState<RootProductID | null>(null);
  const queryClient = useQueryClient();

  const currentDate = useDateStore((state) => state.date);
  const isProductAvailableInRegion = useProductAvailableInRegion();
  const currentRegionCode = useProductStore((state) => state.productParams.regionCode);

  // Convert date to target product format
  const convertDateToTargetFormat = (targetRootProductId: RootProductID): string => {
    try {
      const targetProductId = getTargetProductIdAfterRouting(targetRootProductId);
      const targetFormat = getDateFormatByProductIdAndRegionScope(targetProductId, RegionScope.Au);
      return currentDate.format(targetFormat);
    } catch {
      return currentDate.format(DateFormat.DAY);
    }
  };

  const dropdownElements = useMemo(
    () =>
      sidebarProductsNav.map((element) => ({
        ...element,
        isLoading: loadingProductId === element.id,
        disabled: isLoading && loadingProductId !== element.id,
      })),
    [isLoading, loadingProductId],
  );

  const handleDropdownChange = async ({ id }: DropdownElement<RootProductID>) => {
    if (mainProductKey.includes(id) || isLoading) {
      return;
    }
    setIsLoading(true);
    setLoadingProductId(id);

    try {
      // Convert current date to target product format
      const convertedDate = convertDateToTargetFormat(id);

      let queryToUpdate: QueryParams = {
        date: convertedDate,
        property: null,
        depth: null,
        deploymentPlot: null,
        point: null,
      };

      if (id === 'EACMooringArray') {
        queryToUpdate = {
          region: 'Brisbane',
          date: '20220725', // TODO: hardcoded data for EAC Mooring Array
          property: null,
          depth: null,
          point: null,
          deploymentPlot: null,
        };
      } else if (id === 'currentMeters') {
        const { region, property, depth, date } = currentMetersInitialState;
        queryToUpdate = { date, region, property, depth };
      } else if (id === 'sealCtd') {
        queryToUpdate = {
          region: 'POLAR',
          date: '20240522', // TODO: hardcoded date for seal CTD tags
          property: null,
          depth: null,
          deploymentPlot: null,
          point: null,
        };
      } else if (!isProductAvailableInRegion) {
        queryToUpdate = {
          date: convertedDate,
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

          const isDateInPast = regionLatestDate ? dayjs(regionLatestDate).isBefore(currentDate, 'day') : false;

          const dateToUse = isDateInPast ? regionLatestDate : convertedDate;

          queryToUpdate = {
            date: dateToUse,
            property: null,
            depth: null,
            deploymentPlot: null,
            point: null,
          };
        } catch (error) {
          console.error('Failed to fetch latest dates for product:', id, error);
          // Fallback to using the converted date if the API fails
          queryToUpdate = {
            date: convertedDate,
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

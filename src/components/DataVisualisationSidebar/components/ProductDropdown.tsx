import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown } from '@/components/Shared';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { getProductPathWithSubProduct, getTargetProductIdAfterRouting } from '@/utils/product-utils/product';
import { useQueryParams } from '@/hooks';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useProductAvailableInRegion from '@/stores/product-store/hooks/useProductAvailableInRegion';
import { QueryParams } from '@/hooks/useQueryParams/types/userQueryParams.types';
import { RootProductID } from '@/types/product';
import useProductStore from '@/stores/product-store/productStore';
import { regionLatestDatesOptions } from '@/services/hooks/useRegionLatestDates';
import { LatestRegionDatesResponse, RegionLatestDate } from '@/types/imageList';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { RegionScope } from '@/constants/region';
import useDateStore from '@/stores/date-store/dateStore';
import { DateFormat } from '@/types/date';
import { PRODUCT_LANDING, SidebarProductID } from '@/configs/products/landing';
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
      // This dropdown only switches products within the current /product page, so the
      // path must stay relative (unlike PRODUCT_LANDING.path, which may point to /map for
      // other entry points such as the navbar or the /map sidebar).
      const targetPath = getProductPathWithSubProduct(id);
      const { query: landingQuery, resetDate } = PRODUCT_LANDING[id as SidebarProductID];

      // If the landing config has a hardcoded date, use it directly and skip date-carry logic
      if (landingQuery?.date) {
        const queryToUpdate: QueryParams = {
          region: landingQuery.region ?? null,
          date: landingQuery.date,
          property: landingQuery.property ?? null,
          depth: landingQuery.depth ?? null,
          deploymentPlot: null,
          point: null,
        };
        updateQueryParamsAndNavigate(targetPath, queryToUpdate);
        return;
      }

      // No date correspondence to the previous product (e.g. Surface Waves) — resolve its
      // own latest date for the landing region up front, rather than landing without one.
      // Leaving `date` unset races with the date store: the picker resolves the latest
      // date locally, but the store (which drives the rendered image) only updates once
      // that resolved date round-trips back into the URL, and can be left stale (see #522).
      if (resetDate) {
        const targetProductId = getTargetProductIdAfterRouting(id);
        const region = landingQuery?.region;
        let resolvedDate: string | null = null;
        try {
          const queryOptions = regionLatestDatesOptions(targetProductId);
          const latestDatesData =
            queryClient.getQueryData<LatestRegionDatesResponse>(queryOptions.queryKey) ??
            (await queryClient.fetchQuery<LatestRegionDatesResponse>(queryOptions));
          resolvedDate =
            latestDatesData?.regionLatestDates?.find((item: RegionLatestDate) => item.region === region)?.latestDate ??
            null;
        } catch (error) {
          console.error('Failed to fetch latest date for product:', id, error);
        }

        const queryToUpdate: QueryParams = {
          region: region ?? null,
          date: resolvedDate,
          property: landingQuery?.property ?? null,
          depth: landingQuery?.depth ?? null,
          deploymentPlot: null,
          point: null,
        };
        updateQueryParamsAndNavigate(targetPath, queryToUpdate);
        return;
      }

      // No hardcoded date — carry/convert the current date (SST family, etc.)
      const convertedDate = convertDateToTargetFormat(id);

      let queryToUpdate: QueryParams = {
        date: convertedDate,
        property: null,
        depth: null,
        deploymentPlot: null,
        point: null,
      };

      // Apply any region prescribed by the landing config (e.g. surfaceWaves → 'Au')
      if (landingQuery?.region) {
        queryToUpdate.region = landingQuery.region;
      } else if (!isProductAvailableInRegion) {
        queryToUpdate = {
          ...queryToUpdate,
          region: null,
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
            ...queryToUpdate,
            date: dateToUse,
          };
        } catch (error) {
          console.error('Failed to fetch latest dates for product:', id, error);
          // Fallback to using the converted date if the API fails
        }
      }

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
      widePaddingMenu
      elements={dropdownElements}
      selectedId={(mainProductKey === 'sealCtdTags' ? 'sealCtd' : mainProductKey) as RootProductID}
      onChange={handleDropdownChange}
      toggleTestId="product-dropdown-toggle"
    />
  );
};

export default ProductDropdown;

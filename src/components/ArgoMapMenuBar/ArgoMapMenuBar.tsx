import React, { useState } from 'react';
import { useRegionLatestDates } from '@/services/hooks';
import { useQueryParams } from '@/hooks';
import { Button, ShareButton } from '@/components/Shared';
import { ResetIcon, WmoIcon } from '@/components/Shared/Icons/ui';
import { ProductMenubarText } from '@/constants/textConstant';
import ArgoDatePagination from '@/components/ArgoDatePagination';
import WmoListPopup from '@/components/DataVisualisationSidebar/components/WmoListPopup';

const ArgoMapMenuBar: React.FC = () => {
  const { data: latestDatesData } = useRegionLatestDates('argo', true);
  const { updateQueryParams } = useQueryParams();
  const [isWmoOpen, setIsWmoOpen] = useState(false);

  const handleReset = () => {
    const latestDate = latestDatesData?.regionLatestDates[0]?.latestDate;
    if (latestDate) updateQueryParams({ date: latestDate });
  };

  return (
    <div className="mb-2 w-full bg-white p-2 md:rounded-md md:bg-transparent md:p-0">
      <div className="font-open-sans text-imos-dark-grey flex w-full flex-wrap items-center gap-2 font-medium md:mb-2 md:gap-3">
        <div className="border-imos-calypso-blue/50 flex h-11 grow basis-[calc(100%-4rem)] items-center justify-between rounded-md border bg-white md:grow md:basis-auto md:border-none">
          <ArgoDatePagination />
        </div>

        <Button
          onClick={handleReset}
          className="flex-center border-imos-calypso-blue/50 h-11 w-12 shrink-0 rounded-md bg-white p-3! md:border-none md:p-4!"
          aria-label="Reset to latest date"
          borderRadius="extraSmall"
        >
          <ResetIcon color="imos-deep-blue" size="lg" />
        </Button>

        <div className="order-3 box-border h-11 flex-1 rounded-md border-none md:order-0 md:flex-initial md:grow">
          <Button
            onClick={() => setIsWmoOpen(true)}
            borderRadius="extraSmall"
            className="flex-center h-full w-full border-none bg-white px-2! md:p-3 md:px-5"
          >
            <WmoIcon color="imos-deep-blue" size="lg" className="shrink-0" />
            <p className="text-imos-deep-blue md:text-imos-dark-grey ml-2 text-center text-sm md:ml-3 md:w-20 md:text-base">
              {ProductMenubarText.WMO_NUMBER}
            </p>
          </Button>
          <WmoListPopup isOpen={isWmoOpen} onClose={() => setIsWmoOpen(false)} />
        </div>
        <div className="order-3 box-border h-11 flex-1 rounded-md border-none md:order-0 md:flex-initial md:grow">
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default ArgoMapMenuBar;

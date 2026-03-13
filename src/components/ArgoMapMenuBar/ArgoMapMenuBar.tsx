import React from 'react';
import { useRegionLatestDates } from '@/services/hooks';
import { useQueryParams } from '@/hooks';
import { Button, ShareButton } from '@/components/Shared';
import { ResetIcon } from '@/components/Shared/Icons/ui';
import ArgoDatePagination from '@/components/ArgoDatePagination';

const ArgoMapMenuBar: React.FC = () => {
  const { data: latestDatesData } = useRegionLatestDates('argo', true);
  const { updateQueryParams } = useQueryParams();

  const handleReset = () => {
    const latestDate = latestDatesData?.regionLatestDates[0]?.latestDate;
    if (latestDate) updateQueryParams({ date: latestDate });
  };

  return (
    <div className="mb-2 w-full bg-white p-2 md:rounded-md md:bg-transparent md:p-0">
      <div className="flex w-full flex-wrap items-center gap-2 font-sans font-medium text-imos-dark-grey md:mb-2 md:gap-3">
        <div className="flex h-11 grow basis-[calc(100%-4rem)] items-center justify-between rounded-md border border-imos-calypso-blue/50 bg-white md:grow md:basis-auto md:border-none">
          <ArgoDatePagination />
        </div>

        <Button
          onClick={handleReset}
          className="flex-center h-11 w-12 shrink-0 rounded-md border-imos-calypso-blue/50 bg-white !p-3 md:border-none md:!p-4"
          aria-label="Reset to latest date"
          borderRadius="extraSmall"
        >
          <ResetIcon color="imos-deep-blue" size="lg" />
        </Button>

        <div className="order-3 box-border h-11 flex-1 rounded-md border-none md:order-none md:flex-initial md:grow">
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default ArgoMapMenuBar;

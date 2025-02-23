import React from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useArgoStore, { setArgoDepth } from '@/stores/argo-store/argoStore';
import { Button } from '@/components/Shared';
import { ArgoDepths } from '@/constants/argo';

const ArgoFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const useArgo = useArgoStore((state) => state.selectedArgoParams);

  const { worldMeteorologicalOrgId, cycle } = useArgo;
  const date = searchParams.get('date') || dayjs().format('YYYYMMDD');

  const changeDepth = (newDepth: ArgoDepths) => {
    setSearchParams({ wmoid: worldMeteorologicalOrgId, cycle, depth: newDepth, date });
    setArgoDepth(newDepth);
  };

  return (
    <>
      <Button
        onClick={() => changeDepth(ArgoDepths['400M'])}
        borderRadius="small"
        type={useArgo.depth === ArgoDepths['400M'] ? 'primary' : 'secondary'}
      >
        {ArgoDepths['400M']}
      </Button>
      <Button
        onClick={() => changeDepth(ArgoDepths['2000M'])}
        borderRadius="small"
        type={useArgo.depth === ArgoDepths['2000M'] ? 'primary' : 'secondary'}
      >
        {ArgoDepths['2000M']}
      </Button>
    </>
  );
};

export default ArgoFilters;

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

  const changeDepth = (newDepth: '0' | '1') => {
    setSearchParams({ wmoid: worldMeteorologicalOrgId, cycle, depth: newDepth, date });
    setArgoDepth(newDepth);
  };

  return (
    <div className="flex w-full flex-wrap justify-center gap-3">
      <Button
        onClick={() => changeDepth('1')}
        borderRadius="small"
        type={useArgo.depth === '1' ? 'primary' : 'secondary'}
      >
        {ArgoDepths['400M']}
      </Button>
      <Button
        onClick={() => changeDepth('0')}
        borderRadius="small"
        type={useArgo.depth === '0' ? 'primary' : 'secondary'}
      >
        {ArgoDepths['2000M']}
      </Button>
    </div>
  );
};

export default ArgoFilters;

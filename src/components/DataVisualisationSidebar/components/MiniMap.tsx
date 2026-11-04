import React, { lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import Loading from '@/components/Shared/Loading/Loading';
import { mapboxInstanceIds } from '@/constants/mapboxId';
import BasicMap from '../../Map/BasicMap';

const GlidersMap = lazy(() => import('@/pages/GlidersMap/GlidersMap'));

const MiniMap: React.FC = () => {
  const { mainProduct } = useProductConvert();
  const [params] = useSearchParams();
  const missionId = params.get('missionId') ?? '';
  const missionName = missionId.slice(0, missionId.lastIndexOf('@')) || undefined;
  return (
    <div className="h-60 w-full overflow-hidden">
      {mainProduct?.key === 'gliders' ? (
        <Suspense fallback={<Loading className="h-full" />}>
          <GlidersMap isMiniMap missionName={missionName} window={params.get('window') ?? '4d'} />
        </Suspense>
      ) : (
        <BasicMap id={mapboxInstanceIds.SIDEBAR_MINI_MAP_ID} isMiniMap navigationControl={false} />
      )}
    </div>
  );
};

export default MiniMap;

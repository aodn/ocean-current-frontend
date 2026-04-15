import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { LinearProgress, WidePopup } from '@/components/Shared';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { sharedQueryConfig } from '@/configs/query';
import { ArgoDepths } from '@/constants/argo';
import {
  NOT_REPORTED_FLOAT_IDS,
  NOT_REPORTED_FLOATS_HEADER,
  REPORTED_FLOAT_IDS,
  REPORTED_FLOATS_HEADER,
} from '@/data/argo/wmoFloatsList';

interface WmoListPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WmoPopupBodyProps {
  loadingId: string | null;
  onSelect: (id: string) => void;
}

const WmoPopupBody: React.FC<WmoPopupBodyProps> = ({ loadingId, onSelect }) => {
  const renderIds = (ids: string[]) =>
    ids.map((id) => (
      <Link
        key={id}
        to={`/product/argo?wmoid=${id}`}
        className={`text-base text-imos-deep-blue hover:underline ${loadingId === id ? 'pointer-events-none opacity-50' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onSelect(id);
        }}
      >
        [{id}]
      </Link>
    ));

  return (
    <div className="font-normal">
      {loadingId && <LinearProgress />}
      <div className="p-6">
        <div>
          <p className="mb-3 text-base font-medium text-imos-dark-grey">{REPORTED_FLOATS_HEADER}</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-x-4 gap-y-1">
            {renderIds(REPORTED_FLOAT_IDS)}
          </div>
        </div>
        <div className="mt-8">
          <p className="mb-3 text-base font-medium text-imos-dark-grey">{NOT_REPORTED_FLOATS_HEADER}</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-x-4 gap-y-1">
            {renderIds(NOT_REPORTED_FLOAT_IDS)}
          </div>
        </div>
      </div>
    </div>
  );
};

const WmoListPopup: React.FC<WmoListPopupProps> = ({ isOpen, onClose }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSelect = async (id: string) => {
    setLoadingId(id);
    try {
      const cycles = await queryClient.fetchQuery({
        queryKey: ['argoDateList', id],
        queryFn: () => fetchArgoProfileCyclesByWmoId(id),
        ...sharedQueryConfig,
      });
      const latest = cycles[cycles.length - 1];
      onClose();
      navigate(`/product/argo?wmoid=${id}&cycle=${latest.cycle}&depth=${ArgoDepths['2000M']}&date=${latest.date}`);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <WidePopup
      isOpen={isOpen}
      onClose={onClose}
      title="WMO Number"
      body={() => <WmoPopupBody loadingId={loadingId} onSelect={handleSelect} />}
    />
  );
};

export default WmoListPopup;

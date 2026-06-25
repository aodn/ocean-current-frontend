import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { LinearProgress, TextButton, WidePopup } from '@/components/Shared';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { sharedQueryConfig } from '@/configs/query';
import { ArgoDepths } from '@/constants/argo';
import { ProductMenubarText } from '@/constants/textConstant';
import {
  NOT_REPORTED_FLOAT_IDS,
  NOT_REPORTED_FLOATS_HEADER,
  REPORTED_FLOAT_IDS,
  REPORTED_FLOATS_HEADER,
} from '@/data/argo/wmoFloatsList';

interface WmoListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  openInNewTab?: boolean;
}

interface WmoPopupBodyProps {
  loadingId: string | null;
  onSelect: (id: string) => void;
}

const WmoPopupBody: React.FC<WmoPopupBodyProps> = ({ loadingId, onSelect }) => {
  const renderIds = (ids: string[]) =>
    ids.map((id) => (
      <TextButton
        key={id}
        disabled={loadingId !== null}
        className="text-imos-deep-blue text-base"
        onClick={() => onSelect(id)}
      >
        [{id}]
      </TextButton>
    ));

  return (
    <div className="font-normal" aria-busy={loadingId !== null}>
      {loadingId && <LinearProgress aria-label="Loading float profiles" />}
      <div className="p-6">
        <div>
          <p className="text-imos-dark-grey mb-3 text-base font-medium">{REPORTED_FLOATS_HEADER}</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-x-4 gap-y-1">
            {renderIds(REPORTED_FLOAT_IDS)}
          </div>
        </div>
        <div className="mt-8">
          <p className="text-imos-dark-grey mb-3 text-base font-medium">{NOT_REPORTED_FLOATS_HEADER}</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-x-4 gap-y-1">
            {renderIds(NOT_REPORTED_FLOAT_IDS)}
          </div>
        </div>
      </div>
    </div>
  );
};

const WmoListPopup: React.FC<WmoListPopupProps> = ({ isOpen, onClose, openInNewTab }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSelect = async (id: string) => {
    if (loadingId !== null) return;
    setLoadingId(id);
    const newTab = openInNewTab ? window.open('', '_blank') : null;
    if (newTab) newTab.opener = null;
    let navigated = false;
    try {
      const cycles = await queryClient.fetchQuery({
        queryKey: ['argoDateList', id],
        queryFn: () => fetchArgoProfileCyclesByWmoId(id),
        ...sharedQueryConfig,
      });
      const latest = cycles[cycles.length - 1];
      if (!latest) {
        console.error(`No cycles found for WMO ID: ${id}`);
        return;
      }
      const url = `/product/argo?wmoid=${id}&cycle=${latest.cycle}&depth=${ArgoDepths['2000M']}&date=${latest.date}`;
      onClose();
      if (newTab) {
        newTab.location.href = url;
        navigated = true;
      } else {
        navigate(url);
      }
    } catch (error) {
      console.error(`Failed to load profiles for WMO ID: ${id}`, error);
    } finally {
      if (!navigated) newTab?.close();
      setLoadingId(null);
    }
  };

  return (
    <WidePopup
      isOpen={isOpen}
      onClose={onClose}
      title={ProductMenubarText.WMO_NUMBER}
      body={() => <WmoPopupBody loadingId={loadingId} onSelect={handleSelect} />}
    />
  );
};

export default WmoListPopup;

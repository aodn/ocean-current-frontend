import React, { useState } from 'react';
import { Button } from '@/components/Shared';
import { ArrowIcon, WmoIcon } from '@/components/Shared/Icons/ui';
import useArgoStore from '@/stores/argo-store/argoStore';
import WmoListPopup from './WmoListPopup';

const WmoSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const worldMeteorologicalOrgId = useArgoStore((state) => state.selectedArgoParams.worldMeteorologicalOrgId);

  return (
    <>
      <Button type="primary" size="full" borderRadius="extraSmall" onClick={() => setIsOpen(true)}>
        <WmoIcon color="imos-white" size="base" className="mr-2" />
        {worldMeteorologicalOrgId}
        <ArrowIcon color="imos-white" size="sm" className="absolute right-4 -rotate-90" />
      </Button>
      <WmoListPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default WmoSection;

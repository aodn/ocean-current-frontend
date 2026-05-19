import React, { useEffect, useRef, useState } from 'react';
import { ProductMenubarText } from '@/constants/textConstant';
import { ShareIcon } from '../Icons/ui';
import Button from '../Button/Button';

const ShareButton: React.FC = () => {
  const [copyButtonText, setCopyButtonText] = useState<string>(ProductMenubarText.SHARE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(location.href);
    setCopyButtonText(`${ProductMenubarText.COPIED}!`);
    timeoutRef.current = setTimeout(() => {
      setCopyButtonText(ProductMenubarText.SHARE);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Button
      onClick={handleCopyLink}
      aria-hidden
      borderRadius="extraSmall"
      className="flex-center h-full w-full border-none bg-white px-2! md:p-3 md:px-5"
    >
      <ShareIcon color="imos-deep-blue" size="lg" className="shrink-0" />
      <p className="text-imos-deep-blue md:text-imos-dark-grey ml-2 text-center text-sm md:ml-3 md:w-20 md:text-base">
        {copyButtonText}
      </p>
    </Button>
  );
};

export default ShareButton;

import React, { useState } from 'react';
import { CrossIcon } from '@/components/Shared/Icons';

const BetaBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-imos-pale-blue relative flex min-h-11 w-full items-center py-2 pr-6 pl-2 shadow-sm md:h-11 md:py-0">
      <p className="font-open-sans text-imos-dark-grey m-0 w-full text-left text-base md:text-center">
        We&rsquo;re giving the site a fresh new look. We&rsquo;d greatly appreciate your feedback. {''}
        <a
          href="https://forms.office.com/Pages/ResponsePage.aspx?id=VV3rFZEZvEaNp6slI03uCCQYYrnLj4dIpn1c2hJluMRUQTJIWVMzMThYMUwxR0RKMUMyM0NEQVVXUS4u"
          target="_blank"
          rel="noopener noreferrer"
          className="text-imos-dark-grey font-bold underline-offset-2 hover:underline"
        >
          [click here]
        </a>{' '}
        to share your thoughts.
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss banner"
        className="absolute top-1 right-2 bg-transparent md:top-1/2 md:-translate-y-1/2"
      >
        <CrossIcon size="sm" />
      </button>
    </div>
  );
};

export default BetaBanner;

import React, { useState } from 'react';
import { CrossIcon } from '@/components/Shared/Icons';

const BetaBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative w-full bg-imos-light-blue py-1 pl-2 pr-6 shadow">
      <p className="text-left font-open-sans text-xs text-imos-dark-grey md:text-center md:text-sm">
        We’re giving the site a fresh new look. We’d greatly appreciate your feedback. {''}
        <a
          href="https://forms.office.com/Pages/ResponsePage.aspx?id=VV3rFZEZvEaNp6slI03uCCQYYrnLj4dIpn1c2hJluMRUQTJIWVMzMThYMUwxR0RKMUMyM0NEQVVXUS4u"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-imos-dark-grey underline-offset-2 hover:underline"
        >
          [click here]
        </a>{' '}
        to share your thoughts.
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss banner"
        className="absolute right-2 top-1 bg-transparent md:top-1/2 md:-translate-y-1/2"
      >
        <CrossIcon size="sm" />
      </button>
    </div>
  );
};

export default BetaBanner;

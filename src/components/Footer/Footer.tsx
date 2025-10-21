import React from 'react';
import logo from '@/assets/images/imos-logo.png';
import EmailIcon from '@/assets/icons/EmailIcon.tsx';
import { BrandingText, FooterText } from '@/constants/textConstant.ts';
import { Button } from '../Shared/index.tsx';
import {
  contactEmail,
  contactSubject,
  copyrightText,
  footerAcknowledgeText,
  footerLinks,
  footerSocials,
} from './consts.ts';
import { FooterIcon } from './footer.types';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactUs = () => {
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(contactSubject)}`;
    window.open(mailtoUrl, '_self');
  };

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:gap-8">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="flex flex-shrink-0 items-center">
                <img src={logo} alt="IMOS Logo" className="h-16 w-auto md:h-18" />
              </div>
              <div className="mx-5 h-16 w-px flex-shrink-0 bg-imos-title-blue opacity-50"></div>
              <div className="flex flex-wrap items-center">
                <p className="text-lg font-light text-imos-deep-blue sm:text-xl">{BrandingText.OC_PASCAL_CASE}</p>
                <p className="basis-full text-sm text-imos-dark-grey">{BrandingText.OC_SUBHEADING}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="mb-4 ml-auto flex items-center gap-2 border-none bg-transparent text-imos-nav-text transition-colors hover:opacity-80 md:mb-0 md:ml-0"
            >
              <svg width="26" height="24" viewBox="0 0 25 24" fill="none" className="h-6 w-6">
                <path
                  d="M5.02344 10.5L12.5644 3M12.5644 3L20.1054 10.5M12.5644 3V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-base">{FooterText.BACK_TO_TOP}</p>
            </button>
          </div>

          <p className="text-base leading-7 text-imos-nav-text sm:leading-8">{footerAcknowledgeText}</p>

          <div className="grid grid-cols-2 gap-4 border-y border-imos-deeper-blue py-4 md:flex md:h-20 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full justify-center md:h-12 md:w-[200px] md:justify-start">
              <Button
                type="primary"
                size="full"
                borderRadius="small"
                onClick={handleContactUs}
                className="w-fit border-none bg-imos-deeper-blue px-4 py-2 md:w-full"
              >
                <div className="flex items-center justify-center gap-2 leading-8">
                  <EmailIcon className="h-6 w-6" />
                  <p className="text-base">{FooterText.CONTACT_US}</p>
                </div>
              </Button>
            </div>
            {footerLinks.map(({ text, url }) => (
              <a
                key={text}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center text-base text-imos-nav-text transition-colors hover:opacity-80"
              >
                {text}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between gap-1 sm:gap-4">
            <div className="flex items-center">
              <p className="text-base text-imos-nav-text">{copyrightText}</p>
            </div>
            <div className="flex flex-nowrap gap-1 sm:gap-3">
              {footerSocials.map(({ alt, src, url }: FooterIcon, index: number) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                >
                  <img loading="lazy" alt={alt} src={src} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

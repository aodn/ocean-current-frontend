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
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                <img src={logo} alt="IMOS Logo" className="h-18" />
              </div>
              <div className="mx-5 h-16 w-px bg-imos-title-blue opacity-50"></div>
              <div className="flex flex-wrap items-center">
                <p className="text-xl text-imos-deep-blue">{BrandingText.OC_PASCAL_CASE}</p>
                <p className="basis-full text-sm text-gray-900">{BrandingText.OC_SUBHEADING}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-2 border-none bg-transparent text-black transition-colors hover:text-gray-600 sm:mt-0"
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

          <p className="text-base leading-relaxed text-gray-900">{footerAcknowledgeText}</p>

          <div className="flex h-20 flex-col gap-4 border-y border-imos-deeper-blue py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="items-center flex h-12 w-[200px]">
              <Button
                type="primary"
                size="full"
                borderRadius="small"
                onClick={handleContactUs}
                className="border-none bg-imos-deeper-blue px-4 py-2"
              >
                <div className="flex items-center justify-center gap-2 leading-8">
                  <EmailIcon className="h-6 w-6" />
                  <p className="text-base">{FooterText.CONTACT_US}</p>
                </div>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              {footerLinks.map(({ text, url }) => (
                <a
                  key={text}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base text-black transition-colors hover:text-gray-600"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
            <div className="flex items-center">
              <p className="text-base text-gray-900">{copyrightText}</p>
            </div>
            <div className="flex justify-start gap-3 sm:justify-end">
              {footerSocials.map(({ alt, src, url }: FooterIcon, index: number) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
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

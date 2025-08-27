import React from 'react';
import logo from '@/assets/images/imos-logo.png';
import { BrandingText, FooterText } from '@/constants/textConstant';
import { copyrightText, footerAcknowledgeText, footerLinks, footerSocials } from './consts.ts';
import { FooterIcon } from './footer.types';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <div className="flex items-center">
              <button
                type="button"
                className="flex items-center gap-2 border-none bg-transparent text-black transition-colors hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 14H4V8l8 5 8-5zm-8-7L4 6h16z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-base">{FooterText.CONTACT_US}</p>
              </button>
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

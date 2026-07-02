import React from 'react';
import logo from '@/assets/images/imos-logo.png';
import { BrandingText, FooterText } from '@/constants/textConstant.ts';
import { appVersion } from '@/configs/version.ts';
import {
  COPYRIGHT_TEXT,
  /* FEEDBACK_LINK, */ FOOTER_ACKNOWLEDGE_TEXT,
  FOOTER_LINKS,
  FOOTER_SOCIALS,
} from './consts.ts';
import { FooterIcon } from './footer.types';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // TODO: Re-enable feedback link when the next review round starts
  // const handleClickFeedback = () => {
  //   // window.open(FEEDBACK_LINK, '_blank');
  // };

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
        <div className="flex flex-col gap-4 sm:gap-8">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="flex shrink-0 items-center">
                <img src={logo} alt="IMOS Logo" className="h-16 w-auto md:h-18" />
              </div>
              <div className="bg-imos-title-blue mx-5 h-16 w-px shrink-0 opacity-50"></div>
              <div className="flex flex-wrap items-center">
                <p className="text-imos-deep-blue text-lg font-light sm:text-xl">{BrandingText.OC_PASCAL_CASE}</p>
                <p className="text-imos-dark-grey basis-full text-sm">{BrandingText.OC_SUBHEADING}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-imos-nav-text mb-4 ml-auto flex items-center gap-2 border-none bg-transparent transition-colors hover:opacity-80 md:mb-0 md:ml-0"
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

          <p className="text-imos-nav-text text-base leading-7 sm:leading-8">{FOOTER_ACKNOWLEDGE_TEXT}</p>

          <div className="border-imos-deeper-blue grid grid-cols-2 gap-4 border-y py-4 md:flex md:h-20 md:flex-row md:items-center md:justify-between">
            {/* <div className="flex w-full justify-center md:h-12 md:w-[200px] md:justify-start">
              <Button
                type="primary"
                size="full"
                borderRadius="small"
                onClick={handleClickFeedback}
                className="w-fit border-none bg-imos-deeper-blue px-4 py-2 md:w-full"
              >
                <div className="flex items-center justify-center gap-2 leading-8">
                  <p className="text-base">{FooterText.FEEDBACK}</p>
                </div>
              </Button>
            </div> */}
            {FOOTER_LINKS.map(({ text, url }) => (
              <a
                key={text}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-imos-nav-text flex items-center justify-center text-base transition-colors hover:opacity-80"
              >
                {text}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between gap-1 sm:gap-4">
            <div className="flex items-center">
              <p className="text-imos-nav-text text-base">
                <span>{COPYRIGHT_TEXT}</span>
                <span>. </span>
                <span>Version: {appVersion}</span>
              </p>
            </div>
            <div className="flex flex-nowrap gap-1 sm:gap-3">
              {FOOTER_SOCIALS.map(({ alt, src, url }: FooterIcon, index: number) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
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

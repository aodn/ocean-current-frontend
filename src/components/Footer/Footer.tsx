import React from 'react';
import dayjs from 'dayjs';
import logo from '@/assets/images/full-imos-logo.png';
import { BrandingText } from '@/constants/textConstant';
import { copyrightText, footerAcknowledgeText, footerLinks, footerSocials } from './consts.ts';
import { FooterIcon } from './footer.types';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center bg-white px-5 leading-8 sm:px-10">
      <div className="max-w-8xl py-6 md:pt-10">
        <div className="flex flex-row items-center pb-10 pt-5">
          <img src={logo} alt="IMOS logo" className="h-16" />
          <div className="mx-7 h-14 w-0.5 bg-imos-title-blue opacity-50"></div>

          <div className="leading-6">
            <h1 className="text-2xl font-medium text-imos-deep-blue">{BrandingText.OC_PASCAL_CASE}</h1>
            <h2 className="text-sm font-normal text-imos-subheading-grey">{BrandingText.OC_SUBHEADING}</h2>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 border-y border-imos-deeper-blue py-5 sm:flex-row sm:justify-between">
          {footerLinks.map(({ text, url }) => (
            <a key={text} href={url} target="_blank" rel="noreferrer">
              {text}
            </a>
          ))}
        </div>

        <div className="flex flex-col justify-between pt-5 md:flex-row">
          <p className="md:w-1/2">{footerAcknowledgeText}</p>
          <div className="flex gap-5 self-center px-0.5 max-md:mt-10 md:self-end xl:self-end">
            {footerSocials.map(({ alt, src, url }: FooterIcon, index: number) => (
              <a key={index} href={url} target="_blank" rel="noreferrer">
                <img loading="lazy" alt={alt} src={src} className="aspect-square w-6 shrink-0" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-sm leading-5 md:text-left">{`${copyrightText} ${dayjs().format('YYYY')}`}</p>
      </div>
    </footer>
  );
};

export default Footer;

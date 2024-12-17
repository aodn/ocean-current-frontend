import React from 'react';
import logo from '@/assets/images/imos-logo.png';
import { GeneralText } from '@/constants/textConstant';
import { aodnInfo, copyrightInfo, footerAcknowledgeText, footerLinks, footerSocials, ocSubheading } from './consts.ts';
import { FooterIcon } from './footer.types';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center bg-white px-5 leading-8 sm:px-10">
      <div className="max-w-8xl py-6 md:pt-10">
        <div className="flex flex-row items-center py-5">
          <img src={logo} alt="IMOS logo" className="h-8 sm:h-10 md:h-max" />
          <div className="px-6 leading-6">
            <h1 className="text-2xl font-medium text-imos-deep-blue">{GeneralText.OC_PASCAL_CASE}</h1>
            <h2 className="text-sm font-normal text-imos-subheading-grey">{ocSubheading}</h2>
          </div>
        </div>

        <p className="py-5">{aodnInfo}</p>

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

        <p className="mt-10 text-center text-sm leading-5 md:text-left">{copyrightInfo}</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { copyrightInfo, footerAcknowledgeText, footerLinks, footerSocials } from './data/FooterData';
import { FooterIcon } from './types/footer.types';
// import { FooterIcon, FooterLink } from './types/footer.types';

const Footer: React.FC = () => {
  return (
    <div className="flex w-full justify-center bg-white px-2">
      <div className="max-w-8xl py-6 md:pt-10">
        <div className="text-2xl font-medium leading-7">IMOS OceanCurrent</div>

        <div className="flex flex-col justify-between border-y border-imos-primary-2 py-5 md:flex-row">
          {footerLinks.map(({ text, url }) => (
            <a key={text} href={url} target="_blank" rel="noreferrer">
              {text}
            </a>
          ))}
        </div>

        <div className="flex flex-col justify-between pt-5 md:flex-row">
          <div className="md:w-1/2">{footerAcknowledgeText}</div>
          <div className="flex gap-5 px-0.5 max-md:mt-10 md:self-end xl:self-end">
            {footerSocials.map(({ alt, src, url }: FooterIcon, index: number) => (
              <a key={index} href={url}>
                <img loading="lazy" alt={alt} src={src} className="aspect-square w-5 shrink-0" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 text-left text-sm leading-5">{copyrightInfo}</div>
      </div>
    </div>
  );
};

export default Footer;

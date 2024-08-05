import React from 'react';
import { footerData } from './data/FooterData';
import { FooterIcon, FooterLink } from './types/footer.types';

const Footer: React.FC = () => {
  return (
    <div className="py-6 md:pt-20">
      <div className="text-2xl font-medium leading-7 text-white">IMOS OceanCurrent</div>
      <div className="flex flex-col justify-center md:flex md:flex-row">
        {footerData.map(({ title, links, icons }) => (
          <div key={title} className="w-full md:mr-4 md:w-1/4">
            <div className="mt-11 text-base font-semibold leading-6 text-white max-md:mt-10">{title}</div>
            {links.map(({ name, url }: FooterLink, index: number) => (
              <div key={index} className="mt-6 leading-6 text-white">
                {url ? <a href={url}>{name}</a> : name}
              </div>
            ))}
            {icons && (
              <>
                <div className="mt-20 flex gap-5 px-0.5 max-md:mt-10">
                  {icons.map(({ alt, src, url }: FooterIcon, index: number) => (
                    <a key={index} href={url}>
                      <img loading="lazy" alt={alt} src={src} className="aspect-square w-5 shrink-0" />
                    </a>
                  ))}
                </div>
                <div className="mt-10 text-left text-sm leading-5 text-white">
                  Copyright © 2020. All rights reserved.
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;

import React, { useState } from 'react';
import { Button, Popup } from '@/components/Shared';

const Legend: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const PopupBody = () => {
    return (
      <div className="p-4">
        <div>
          <div className="inline-block">
            <div className="mr-2 inline-block h-3 w-3 rounded-full border border-[#FA10E2] bg-white"></div>
            <span className="mr-1 inline-block font-bold text-imos-dark-grey">Argo: </span>
            pink circle at the location of any profile made in the window t0 +/- 12hrs; click on the circle to see the
            Argo profiles of temperature and salinity.
          </div>
          <div className="mt-2 inline-block">
            <div className="mr-2 inline-block h-3 w-3 rotate-45 bg-[#FA10E2]"></div>
            <span className="mr-1 inline-block font-bold text-imos-dark-grey">Glider: </span>
            small diamonds (pink and black) indicate 6-hourly glider locations, pink when the glider is in the 24hr
            window around t0; click on the diamonds to see the glider profiles.
          </div>
          <div className="mt-2 inline-block">
            <div className="-mt-2 mr-2 inline-flex flex-col">
              <div className="relative -top-2 h-0.5 w-3 bg-[#FA10E2]">
                <div className="absolute -top-1 right-0 h-2 w-2 rotate-45 border-t-2 border-[#FA10E2]"></div>
              </div>
              <div className="relative -top-2 mt-1 h-0.5 w-3 bg-[#2972FF]">
                <div className="absolute -top-[2px] right-0 h-2 w-2 rotate-45 border-r-2 border-[#2972FF]"></div>
              </div>
            </div>
            <span className="mr-1 inline-block font-bold text-imos-dark-grey">Radar: </span>
            the average velocity using all available hourly radar velocities from the IMOS radar facility within a
            specified time window around t0. Eg (3-12h avg) indicates a minimum of 3 hourly radar velocity estimates are
            required within a 12 hour window. Blue (red) vectors are plotted over waters warmer (cooler) than the mean
            value in the colorbar axis.
          </div>
          <div className="mt-2 inline-block">
            <div className="mr-2 inline-block h-3 w-3 rotate-45 -skew-x-12 -skew-y-12 border-r-2 border-t-2 border-[#FA10E2]"></div>
            <span className="mr-1 inline-block font-bold text-imos-dark-grey">Drifter: </span>
            small diamonds (pink and black) indicate 6-hourly glider locations, pink when the glider is in the 24hr
            window around t0; click on the diamonds to see the glider profiles.
          </div>
          <div className="mt-2 inline-block">
            <div className="mr-2 inline-block h-3 w-3 rounded-full border-2 border-[#838383]"></div>
            <span className="mr-1 inline-block font-bold text-imos-dark-grey">Ship: </span>
            Underway water temperature, plotted hourly, from ships with hull-mounted intake. These include the RV
            Investigator (MNF), RV Solander and RV Cape Ferguson (AIMS), and the Spirit of Tasmania 2, Sea Flyte and
            Stadacona from (IMOS Ships of Opportunity Facility). Data within t0 +/- 1day is indicated with a small black
            dot at the ship location and a black circle indicates the measurement occurred within 12 hours of t0.
          </div>
          <div className="mt-4">
            <p>
              <span className="mr-1 inline-block font-bold text-imos-dark-grey">Selected isobaths:</span> grey and cyan
              contours, in metres.
            </p>
            <p>
              <span className="mr-1 inline-block font-bold text-imos-dark-grey">Gridded Sea Level (GSL):</span> white
              contours every 0.1 m.
            </p>
            <p>
              <span className="mr-1 font-bold text-imos-dark-grey">Geostrophic velocity:</span>
              black arrows, where length indicates both speed and distance something would travel over a 12hr or 24hr
              period (as indicated) at this velocity. The latest GSLA (NRT00) is usually 4 days behind real time - the
              date of the GSLA and velocity vectors is indicated on the plot.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-4">
      <div className="mb-6 mt-2 grid grid-cols-2 gap-x-1 gap-y-4 px-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <div className="mr-3 h-3 w-3 rounded-full border border-[#FA10E2] bg-white"></div>
            <span className="text-imos-grey">Argo</span>
          </div>
          <div className="flex items-center">
            <div className="mr-3 h-3 w-3 rounded-full bg-[#838383]"></div>
            <span className="text-imos-grey">Mooring</span>
          </div>
          <div className="flex items-center">
            <div className="mr-3 h-3 w-3 rounded-full border-2 border-[#838383]"></div>
            <span className="text-imos-grey">Ship</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <div className="mr-3 h-3 w-3 rotate-45 bg-[#FA10E2]"></div>
            <span className="text-imos-grey">Glider</span>
          </div>
          <div className="flex items-center">
            <div className="mr-3 flex flex-col">
              <div className="relative h-0.5 w-3 bg-[#FA10E2]">
                <div className="absolute -top-1 right-0 h-2 w-2 rotate-45 border-t-2 border-[#FA10E2]"></div>
              </div>
              <div className="relative mt-1 h-0.5 w-3 bg-[#2972FF]">
                <div className="absolute -top-[2px] right-0 h-2 w-2 rotate-45 border-r-2 border-[#2972FF]"></div>
              </div>
            </div>
            <span className="text-imos-grey">Radar</span>
          </div>

          <div className="flex items-center">
            <div className="mr-3 h-3 w-3 rotate-45 -skew-x-12 -skew-y-12 border-r-2 border-t-2 border-[#FA10E2]"></div>
            <span className="text-imos-grey">Drifter</span>
          </div>
        </div>
      </div>
      <Button onClick={handlePopup} size="full" borderRadius="small" type="secondary" className="!border">
        <span className="text-imos-grey">Click for more information</span>
      </Button>

      <Popup title="Legend" body={PopupBody} isOpen={isPopupOpen} onClose={handlePopup} />
    </div>
  );
};

export default Legend;

import australiaIcon from '@/assets/icons/australia-icon.png';
import localRegionIcon from '@/assets/icons/local-region-icon.png';
import stateRegionIcon from '@/assets/icons/state-region-icon.png';
import categoryIcon from '@/assets/icons/category-icon.png';
import { Dropdown } from '@/components/Shared';
import { mapNavbarDataElements } from './data/mapNavbar';

const MapNavbar: React.FC = () => {
  return (
    <div className="flex justify-between bg-white p-2">
      <div className="flex items-center">
        <div className="flex p-2">
          <img src={categoryIcon} alt="category logo" />
          <span className="ml-3 text-lg text-imos-sea-blue">Category</span>
        </div>
        <Dropdown elements={mapNavbarDataElements} initialSelectedId="snapshot-sea" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex p-2">
          <img src={localRegionIcon} alt="local region logo" />
          <span className="ml-3 whitespace-pre text-lg text-imos-sea-blue">Local Region</span>
        </div>
        <div className="flex p-2">
          <img src={stateRegionIcon} alt="state region logo" />
          <span className="ml-3 whitespace-pre text-lg text-imos-sea-blue">State Region</span>
        </div>
        <div className="flex rounded-md border-2 border-imos-sea-blue p-2">
          <img src={australiaIcon} alt="australia region logo" />
          <span className="ml-3 whitespace-pre text-lg text-imos-sea-blue ">All Australia</span>
        </div>
      </div>
    </div>
  );
};

export default MapNavbar;

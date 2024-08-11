import React from 'react';
import { Link } from 'react-router-dom';
import FullscreenIcon from '@/assets/icons/map-fullscreen-icon.svg';

const NavigateIcon: React.FC = () => {
  return (
    <div className="absolute ml-3 mt-3  h-[29px] w-[29px]  rounded bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.1)] ">
      <Link className="flex h-full w-full items-center justify-center bg-transparent p-1 hover:bg-black/5" to="/map">
        <img src={FullscreenIcon} alt="full-screen-icon" />
      </Link>
    </div>
  );
};

export default NavigateIcon;

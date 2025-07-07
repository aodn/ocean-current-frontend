import React from 'react';

interface DataImageProps {
  src: string;
  onError: () => void;
}

const DataImage: React.FC<DataImageProps> = ({ src, onError }) => {
  return (
    <div className="h-full bg-white">
      <img className="max-h-[80vh] w-full select-none object-contain" src={src} alt="product" onError={onError} />
    </div>
  );
};

export default DataImage;

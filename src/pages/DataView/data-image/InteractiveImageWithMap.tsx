/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { getArgoProfileCyclesByWmoId } from '@/services/argo';
import { findMostRecentDateBefore } from '@/utils/date-utils/date';
import { ArgoTagMapArea } from '@/types/argo';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useDateStore from '@/stores/date-store/dateStore';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { ImageMapArea } from '@/types/dataImage';
import {
  calculateImageScales,
  scaleImageMapAreaCoordinates,
  scaleImageMapAreas,
} from '@/utils/data-image-utils/dataImage';
// import { InteractiveImageWithMapProps } from './types/imageWithMap.types';

const MAP_ID = 'interactive-image-map';

export interface ImageRefHandle {
  naturalHeight: number | undefined;
}

export interface InteractiveImageWithMapProps<T extends ImageMapArea> {
  src: string;
  alt: string;
  originalAreas: T[];
  // dateString: string;
  onAreaClick?: (area: T) => void;
  onImageLoad?: (originalHeight: number) => void;
}

const InteractiveImageWithMapComponent = <T extends ImageMapArea>(
  { src, alt, originalAreas, onAreaClick, onImageLoad }: InteractiveImageWithMapProps<T>,
  ref: ForwardedRef<ImageRefHandle>,
): ReactElement => {
  // const imgRef = useRef<HTMLImageElement | null>(null);
  const [areas, setAreas] = useState<T[]>(originalAreas);

  const imgRef = useRef<HTMLImageElement | null>(null);

  useImperativeHandle(ref, () => ({
    get naturalHeight() {
      return imgRef.current?.naturalHeight;
    },
  }));

  // const areas = originalAreas;
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const useDate = useDateStore((state) => state.date);
  const { mainProduct } = useProductConvert();

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  const updateAreas = (originalWidth: number, originalHeight: number, width: number, height: number) => {
    const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, originalAreas);

    setAreas(convertedCoords);
  };

  useEffect(() => {
    // console.log('loaded!!!!!!!!!!!!!!!!!');

    if (imgRef.current) {
      const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;

      // const originalWidth = imgRef.current.naturalWidth;
      // const originalHeight = imgRef.current.naturalHeight;
      // const width = imgRef.current.width;
      // const height = imgRef.current.height;

      // if (onImageLoad) {
      //   onImageLoad(originalHeight);
      // }

      // const offsetAreas = originalAreas.map((area) => {
      //   const coords = convertProductWithArgoCoordsOffset(area.coords, originalHeight);
      //   return {
      //     ...area,
      //     coords,
      //   };
      // });

      const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, originalAreas);

      setAreas(convertedCoords);
    }
  }, [originalAreas]);

  const handleLoad = () => {
    // console.log('loaded!!!!!!!!!!!!!!!!!');

    if (imgRef.current) {
      const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;

      if (onImageLoad) {
        onImageLoad(originalHeight);
      }

      // const offsetAreas = originalAreas.map((area) => {
      //   const coords = convertProductWithArgoCoordsOffset(area.coords, originalHeight);
      //   return {
      //     ...area,
      //     coords,
      //   };
      // });

      // const { scaleX, scaleY } = calculateImageScales(originalWidth, originalHeight, width, height);

      // const convertedCoords1 = scaleImageMapAreaCoordinates(originalAreas, scaleX, scaleY) as T[];

      const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, originalAreas);

      setAreas(convertedCoords);
    }
  };

  /*   useEffect(() => {
    const handleLoad = () => {
      console.log('loaded!!!!!!!!!!!!!!!!!');

      if (imgRef.current) {
        const originalWidth = imgRef.current.naturalWidth;
        const originalHeight = imgRef.current.naturalHeight;
        const width = imgRef.current.width;
        const height = imgRef.current.height;

        if (onImageLoad) {
          onImageLoad(originalHeight);
        }

        // const offsetAreas = originalAreas.map((area) => {
        //   const coords = convertProductWithArgoCoordsOffset(area.coords, originalHeight);
        //   return {
        //     ...area,
        //     coords,
        //   };
        // });

        const { scaleX, scaleY } = calculateImageScales(originalWidth, originalHeight, width, height);

        const convertedCoords = convertCoordsBasedOnImageScale(originalAreas, scaleX, scaleY) as T[];

        console.log('originalAreas', originalAreas);
        console.log('convertedCoords', convertedCoords);

        setAreas(convertedCoords);
      }
    };
    const imageElement = imgRef.current;
    if (imageElement) {
      imageElement.complete ? handleLoad() : imageElement.addEventListener('load', handleLoad);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener('load', handleLoad);
      }
    };
  }, [src, originalAreas]);
 */
  // console.log('ImageWithMap rendered', areas);

  const handleAreaClick = async (e: MouseEvent<HTMLAreaElement, globalThis.MouseEvent>, area: T) => {
    e.preventDefault();
    if (onAreaClick) {
      onAreaClick(area);
    }
  };

  if (imgLoadError) {
    return <ErrorImage product={mainProduct!} date={useDate} />;
  }

  return (
    <div className="relative inline-block w-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        useMap={`#${MAP_ID}`}
        className="max-h-[80vh] select-none object-contain"
        onError={() => {
          setImgLoadError('Image not available');
        }}
        onLoad={handleLoad}
      />
      <map name={MAP_ID}>
        {areas.map((area, index) => (
          <area
            key={index}
            className="cursor-pointer"
            shape={area.shape}
            coords={area.coords.join(',')}
            alt={area.alt || `Area ${index + 1}`}
            href={area.href}
            onClick={(e) => handleAreaClick(e, area)}
            aria-hidden="true"
          />
        ))}
      </map>
    </div>
  );
};

const InteractiveImageWithMap = forwardRef(InteractiveImageWithMapComponent) as <T extends ImageMapArea>(
  props: InteractiveImageWithMapProps<T> & { ref?: ForwardedRef<ImageRefHandle> },
) => ReactElement;

export default InteractiveImageWithMap;

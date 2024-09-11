import { ImageParameter } from '@/types/dataImage';

// TODO: bounds roughly measured from the image by hand, need more accurate values
export const argoMapImgParamsOld: ImageParameter = {
  imageWidth: 450,
  imageHeight: 401,
  imageBounds: [90, 180, -68, 0],
};

export const argoMapImgParamsNew: ImageParameter = {
  imageWidth: 650,
  imageHeight: 438,
  imageBounds: [90, 220, -68, 10],
};

export const currentMetersImgParams: ImageParameter = {
  imageWidth: 857,
  imageHeight: 760,
  imageBounds: [105.8667, 162.9333, -50.4118, -5.7647],
};

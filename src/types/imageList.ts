interface ImageFile {
  name: string;
}

interface ImageListResponse {
  path: string;
  productId: string;
  region: string;
  files: ImageFile[];
}

export type { ImageFile, ImageListResponse };

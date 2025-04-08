interface ImageFile {
  name: string;
  path: string;
}

interface ImageListResponse {
  path: string;
  productId: string;
  region: string;
  files: ImageFile[];
}

export type { ImageListResponse };

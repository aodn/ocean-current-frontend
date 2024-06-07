declare module 'gifshot' {
  interface CreateGIFOptions {
    images: string[];
    gifWidth?: number;
    gifHeight?: number;
    numWorkers?: number;
    frameDuration?: number;
    sampleInterval?: number;
    progressCallback?: (captureProgress: number) => void;
  }

  interface CreateGIFObject {
    error: boolean;
    errorCode?: string;
    errorMsg?: string;
    image: string;
  }

  export function createGIF(options: CreateGIFOptions, callback: (obj: CreateGIFObject) => void): void;
}

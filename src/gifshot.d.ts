declare module 'gifshot' {
  interface GIFshotOptions {
    images: string[];
    gifWidth?: number;
    gifHeight?: number;
    interval?: number;
    numFrames?: number;
    frameDuration?: number;
    sampleInterval?: number;
    numWorkers?: number;
    [key: string]: any;
  }

  interface GIFshotResult {
    error: boolean;
    errorCode?: string;
    errorMsg?: string;
    image: string;
  }

  export function createGIF(
    options: GIFshotOptions,
    callback: (result: GIFshotResult) => void
  ): void;

  export default {
    createGIF
  };
}

import { AnalysisResult } from '../types/analysis';

/**
 * Analyzes an image to determine if seaweed is ready for harvest
 * @param imageUrl URL of the image to analyze
 * @returns Promise with analysis result
 */
export const analyzeImage = (imageUrl: string): Promise<AnalysisResult> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const result = processImageData(img);
        resolve(result);
      } catch (error) {
        reject(new Error(`Failed to analyze image`));
      }
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = imageUrl;
  });
};

/**
 * Processes image data to determine harvest readiness
 * @param img Image element with loaded seaweed image
 * @returns Analysis result with harvest recommendation
 */
function processImageData(img: HTMLImageElement): AnalysisResult {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not create canvas context');
  }
  
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  let readyPixels = 0;
  let notReadyPixels = 0;
  let totalAnalyzedPixels = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    if (a < 128) continue;
    if (r < 30 && g < 30 && b < 30) continue;
    if (b > r && b > g) continue;
    
    totalAnalyzedPixels++;
    
    if (g > r * 1.1) {
      readyPixels++;
    } else {
      notReadyPixels++;
    }
  }
  
  const readyPercent = (readyPixels / totalAnalyzedPixels) * 100;
  const isReady = readyPercent > 15;
  
  return {
    isReady,
    waitTime: isReady ? undefined : '3-4 weeks',
    colorPercentages: {
      ready: readyPercent,
      notReady: 100 - readyPercent
    }
  };
}
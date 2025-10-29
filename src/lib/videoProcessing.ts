/**
 * Video Processing Engine
 * Implements perception-aware compression and AI-based quality enhancement
 */

export interface EnhancementSettings {
  revertCompression: number;
  recoverDetails: number;
  sharpen: number;
  reduceNoise: number;
  dehalo: number;
  antialiasDeblur: number;
  outputSize: string;
  scalePercentage: number;
  enablePerceptionAware: boolean;
}

export interface QualitySettings {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
}

export interface DetectedRegion {
  type: 'face' | 'text' | 'motion' | 'background';
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  priority: number; // Higher priority = more quality allocation
}

/**
 * Face Detection using Canvas and basic color analysis
 * In production, this would use TensorFlow.js or similar ML library
 */
export const detectFaces = async (
  canvas: HTMLCanvasElement
): Promise<DetectedRegion[]> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const faces: DetectedRegion[] = [];

  // Simple skin tone detection (R>G>B pattern)
  // This is a simplified algorithm - production would use face-api.js or TensorFlow
  const width = canvas.width;
  const height = canvas.height;
  const blockSize = 32;

  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      let skinPixels = 0;
      let totalPixels = 0;

      for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
        for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4;
          const r = imageData.data[idx];
          const g = imageData.data[idx + 1];
          const b = imageData.data[idx + 2];

          // Skin tone detection heuristic
          if (r > 95 && g > 40 && b > 20 && 
              r > g && r > b && 
              Math.abs(r - g) > 15) {
            skinPixels++;
          }
          totalPixels++;
        }
      }

      const skinRatio = skinPixels / totalPixels;
      if (skinRatio > 0.3) {
        faces.push({
          type: 'face',
          x,
          y,
          width: blockSize,
          height: blockSize,
          confidence: skinRatio,
          priority: 10 // Highest priority
        });
      }
    }
  }

  return mergeSimilarRegions(faces);
};

/**
 * Text Detection using edge detection
 */
export const detectText = async (
  canvas: HTMLCanvasElement
): Promise<DetectedRegion[]> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const edges = detectEdges(imageData);
  const textRegions: DetectedRegion[] = [];

  const blockSize = 24;
  for (let y = 0; y < canvas.height; y += blockSize) {
    for (let x = 0; x < canvas.width; x += blockSize) {
      const edgeCount = countEdgesInRegion(edges, x, y, blockSize, canvas.width);
      const edgeDensity = edgeCount / (blockSize * blockSize);

      // High edge density suggests text
      if (edgeDensity > 0.15 && edgeDensity < 0.5) {
        textRegions.push({
          type: 'text',
          x,
          y,
          width: blockSize,
          height: blockSize,
          confidence: edgeDensity,
          priority: 9 // Very high priority
        });
      }
    }
  }

  return mergeSimilarRegions(textRegions);
};

/**
 * Motion Detection by comparing frames
 */
export const detectMotion = (
  previousFrame: ImageData,
  currentFrame: ImageData,
  threshold: number = 30
): DetectedRegion[] => {
  const motionRegions: DetectedRegion[] = [];
  const blockSize = 16;
  const width = currentFrame.width;
  const height = currentFrame.height;

  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      let diffSum = 0;
      let pixelCount = 0;

      for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
        for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4;
          
          const rDiff = Math.abs(currentFrame.data[idx] - previousFrame.data[idx]);
          const gDiff = Math.abs(currentFrame.data[idx + 1] - previousFrame.data[idx + 1]);
          const bDiff = Math.abs(currentFrame.data[idx + 2] - previousFrame.data[idx + 2]);
          
          diffSum += (rDiff + gDiff + bDiff) / 3;
          pixelCount++;
        }
      }

      const avgDiff = diffSum / pixelCount;
      if (avgDiff > threshold) {
        motionRegions.push({
          type: 'motion',
          x,
          y,
          width: blockSize,
          height: blockSize,
          confidence: Math.min(avgDiff / 100, 1),
          priority: 8 // High priority
        });
      }
    }
  }

  return mergeSimilarRegions(motionRegions);
};

/**
 * Edge detection using Sobel operator
 */
const detectEdges = (imageData: ImageData): Uint8ClampedArray => {
  const width = imageData.width;
  const height = imageData.height;
  const edges = new Uint8ClampedArray(width * height);

  // Sobel kernels
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0, gy = 0;

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          const gray = (imageData.data[idx] + imageData.data[idx + 1] + imageData.data[idx + 2]) / 3;
          
          const kernelIdx = (ky + 1) * 3 + (kx + 1);
          gx += gray * sobelX[kernelIdx];
          gy += gray * sobelY[kernelIdx];
        }
      }

      const magnitude = Math.sqrt(gx * gx + gy * gy);
      edges[y * width + x] = magnitude > 128 ? 255 : 0;
    }
  }

  return edges;
};

const countEdgesInRegion = (
  edges: Uint8ClampedArray,
  x: number,
  y: number,
  size: number,
  width: number
): number => {
  let count = 0;
  for (let dy = 0; dy < size; dy++) {
    for (let dx = 0; dx < size; dx++) {
      if (edges[(y + dy) * width + (x + dx)] === 255) {
        count++;
      }
    }
  }
  return count;
};

/**
 * Merge overlapping or adjacent regions
 */
const mergeSimilarRegions = (regions: DetectedRegion[]): DetectedRegion[] => {
  if (regions.length === 0) return [];

  const merged: DetectedRegion[] = [];
  const used = new Set<number>();

  for (let i = 0; i < regions.length; i++) {
    if (used.has(i)) continue;

    let current = { ...regions[i] };
    used.add(i);

    for (let j = i + 1; j < regions.length; j++) {
      if (used.has(j)) continue;

      if (regionsOverlap(current, regions[j])) {
        current = mergeRegions(current, regions[j]);
        used.add(j);
      }
    }

    merged.push(current);
  }

  return merged;
};

const regionsOverlap = (a: DetectedRegion, b: DetectedRegion): boolean => {
  return !(a.x + a.width < b.x || 
           b.x + b.width < a.x || 
           a.y + a.height < b.y || 
           b.y + b.height < a.y);
};

const mergeRegions = (a: DetectedRegion, b: DetectedRegion): DetectedRegion => {
  const minX = Math.min(a.x, b.x);
  const minY = Math.min(a.y, b.y);
  const maxX = Math.max(a.x + a.width, b.x + b.width);
  const maxY = Math.max(a.y + a.height, b.y + b.height);

  return {
    type: a.type,
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
    confidence: Math.max(a.confidence, b.confidence),
    priority: Math.max(a.priority, b.priority)
  };
};

/**
 * AI-powered upscaling using bilinear interpolation with sharpening
 */
export const upscaleFrame = (
  sourceCanvas: HTMLCanvasElement,
  targetWidth: number,
  targetHeight: number,
  settings: EnhancementSettings
): HTMLCanvasElement => {
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = targetWidth;
  outputCanvas.height = targetHeight;
  const ctx = outputCanvas.getContext('2d');
  if (!ctx) return outputCanvas;

  // Draw upscaled image
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);

  // Apply enhancement filters
  const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
  
  if (settings.sharpen > 0) {
    applySharpen(imageData, settings.sharpen / 100);
  }
  
  if (settings.reduceNoise > 0) {
    applyNoiseReduction(imageData, settings.reduceNoise / 100);
  }
  
  if (settings.recoverDetails > 0) {
    applyDetailRecovery(imageData, settings.recoverDetails / 100);
  }

  ctx.putImageData(imageData, 0, 0);
  return outputCanvas;
};

/**
 * Apply sharpening filter
 */
const applySharpen = (imageData: ImageData, strength: number): void => {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const temp = new Uint8ClampedArray(data);

  // Sharpening kernel
  const kernel = [
    0, -strength, 0,
    -strength, 1 + 4 * strength, -strength,
    0, -strength, 0
  ];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4 + c;
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            sum += temp[idx] * kernel[kernelIdx];
          }
        }
        const idx = (y * width + x) * 4 + c;
        data[idx] = Math.max(0, Math.min(255, sum));
      }
    }
  }
};

/**
 * Apply noise reduction using bilateral filter
 */
const applyNoiseReduction = (imageData: ImageData, strength: number): void => {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const temp = new Uint8ClampedArray(data);
  const radius = Math.floor(strength * 2);

  for (let y = radius; y < height - radius; y++) {
    for (let x = radius; x < width - radius; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        let weightSum = 0;

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const idx = ((y + dy) * width + (x + dx)) * 4 + c;
            const centerIdx = (y * width + x) * 4 + c;
            
            const spatialDist = dx * dx + dy * dy;
            const colorDist = Math.abs(temp[idx] - temp[centerIdx]);
            
            const weight = Math.exp(-spatialDist / (2 * strength * 10) - colorDist / (2 * 50));
            sum += temp[idx] * weight;
            weightSum += weight;
          }
        }

        const idx = (y * width + x) * 4 + c;
        data[idx] = sum / weightSum;
      }
    }
  }
};

/**
 * Detail recovery using unsharp mask
 */
const applyDetailRecovery = (imageData: ImageData, strength: number): void => {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const blurred = new Uint8ClampedArray(data);

  // Gaussian blur
  const radius = 2;
  for (let y = radius; y < height - radius; y++) {
    for (let x = radius; x < width - radius; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        let count = 0;

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const idx = ((y + dy) * width + (x + dx)) * 4 + c;
            sum += data[idx];
            count++;
          }
        }

        const idx = (y * width + x) * 4 + c;
        blurred[idx] = sum / count;
      }
    }
  }

  // Unsharp mask: original + strength * (original - blurred)
  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      const original = data[i + c];
      const detail = original - blurred[i + c];
      data[i + c] = Math.max(0, Math.min(255, original + detail * strength));
    }
  }
};

/**
 * Apply perception-aware compression
 * Allocates quality based on region importance
 */
export const applyPerceptionAwareCompression = (
  canvas: HTMLCanvasElement,
  regions: DetectedRegion[]
): HTMLCanvasElement => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);

  // Create quality map
  const qualityMap = new Float32Array(width * height).fill(0.3); // Background quality

  // Mark high-priority regions
  regions.forEach(region => {
    const qualityBoost = region.priority / 10; // Convert priority to 0-1 range
    
    for (let y = region.y; y < region.y + region.height && y < height; y++) {
      for (let x = region.x; x < region.x + region.width && x < width; x++) {
        const idx = y * width + x;
        qualityMap[idx] = Math.max(qualityMap[idx], qualityBoost);
      }
    }
  });

  // Apply variable quality compression
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const quality = qualityMap[y * width + x];
      
      if (quality < 0.7) {
        // Apply more compression to low-priority areas
        const compressionStrength = (1 - quality) * 0.5;
        for (let c = 0; c < 3; c++) {
          const original = imageData.data[idx + c];
          const compressed = Math.round(original / (1 + compressionStrength)) * (1 + compressionStrength);
          imageData.data[idx + c] = compressed;
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

/**
 * Process video frame with all enhancements
 */
export const processVideoFrame = async (
  sourceCanvas: HTMLCanvasElement,
  settings: EnhancementSettings,
  qualitySettings: QualitySettings,
  previousFrame?: ImageData
): Promise<{
  processedCanvas: HTMLCanvasElement;
  regions: DetectedRegion[];
}> => {
  // Detect important regions
  const faces = await detectFaces(sourceCanvas);
  const text = await detectText(sourceCanvas);
  
  let motion: DetectedRegion[] = [];
  if (previousFrame) {
    const currentFrameData = sourceCanvas.getContext('2d')?.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    if (currentFrameData) {
      motion = detectMotion(previousFrame, currentFrameData);
    }
  }

  const allRegions = [...faces, ...text, ...motion];

  // Upscale if needed
  const targetScale = settings.scalePercentage / 100;
  const targetWidth = Math.round(sourceCanvas.width * targetScale);
  const targetHeight = Math.round(sourceCanvas.height * targetScale);

  let processedCanvas = sourceCanvas;
  if (targetScale !== 1) {
    processedCanvas = upscaleFrame(sourceCanvas, targetWidth, targetHeight, settings);
  }

  // Apply perception-aware compression
  if (settings.enablePerceptionAware) {
    processedCanvas = applyPerceptionAwareCompression(processedCanvas, allRegions);
  }

  // Apply quality adjustments
  const ctx = processedCanvas.getContext('2d');
  if (ctx) {
    ctx.filter = `
      brightness(${qualitySettings.brightness}%)
      contrast(${qualitySettings.contrast}%)
      saturate(${qualitySettings.saturation}%)
      hue-rotate(${qualitySettings.hue}deg)
    `;
    ctx.drawImage(processedCanvas, 0, 0);
  }

  return {
    processedCanvas,
    regions: allRegions
  };
};

export function optimizeImageUrl(url: string, width: number = 800, format: 'auto' | 'webp' = 'auto'): string {
  // If it's an Unsplash image, we can optimize it using their API
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    const formatParam = format === 'webp' ? 'fm=webp' : 'auto=format';
    return `${baseUrl}?w=${width}&q=80&${formatParam}&fit=crop`;
  }
  return url;
}

export function generateResponsiveSrcSet(url: string, sizes: number[] = [400, 800, 1200]): string {
  return sizes.map(size => `${optimizeImageUrl(url, size, 'webp')} ${size}w`).join(', ');
}

export function getImageDimensions(url: string): { width: number, height: number } {
  // Default aspect ratio if we can't determine
  return { width: 1200, height: 800 };
}

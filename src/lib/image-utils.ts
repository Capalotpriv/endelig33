export function optimizeImageUrl(url: string, width: number = 800): string {
  // If it's an Unsplash image, we can optimize it using their API
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${width}&q=80&auto=format,compress`;
  }
  return url;
}

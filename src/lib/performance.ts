/**
 * Utility for monitoring web performance metrics
 */

/**
 * Monitors the Largest Contentful Paint (LCP) and logs it
 * Can be used during development to identify LCP elements
 */
export function monitorLCP() {
  // Only run in browser environment
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
    return;
  }

  try {
    // Create a new PerformanceObserver instance
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lcpEntry = entries[entries.length - 1];
      
      console.info('LCP:', lcpEntry.startTime / 1000, 'seconds');
      // Use type assertion as LargestContentfulPaint is not in all TypeScript versions
      console.info('LCP element:', (lcpEntry as any).element);
      
      // Disconnect after capturing the latest LCP element
      lcpObserver.disconnect();
    });
    
    // Register observer for LCP
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.error('LCP monitoring failed:', e);
  }
}

/**
 * Debounce function to limit how often a function is called
 */
export function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Loads images lazily when they come into viewport
 * @param rootMargin margin around the root
 */
export function setupLazyLoading(rootMargin = '200px 0px') {
  // Only run in browser environment
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return;
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          
          observer.unobserve(img);
        }
      });
    },
    { rootMargin }
  );
  
  // Find all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach((img) => observer.observe(img));
} 
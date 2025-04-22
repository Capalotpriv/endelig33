import React, { useState } from "react";
import { optimizeImageUrl, generateResponsiveSrcSet, getImageDimensions } from "@/lib/image-utils";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export default function ResponsiveImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  width,
  height,
  objectFit = "cover",
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const dimensions = width && height ? { width, height } : getImageDimensions(src);
  
  // Use preholder.png instead of dynamic placeholder
  const placeholderUrl = "/preholder.png";
  
  // Only use lazy loading if not priority
  const loadingAttribute = priority ? "eager" : "lazy";

  // Calculate aspect ratio for proper sizing
  const aspectRatio = dimensions.width / dimensions.height;

  return (
    <div 
      className={`overflow-hidden relative ${className}`}
      style={{ aspectRatio: aspectRatio }}
    >
      {!isLoaded && (
        <img
          src={placeholderUrl}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover blur-lg scale-110 transform transition-opacity opacity-90"
          aria-hidden="true"
        />
      )}
      <img
        src={optimizeImageUrl(src, 800, 'webp')}
        srcSet={generateResponsiveSrcSet(src)}
        sizes={sizes}
        alt={alt}
        loading={loadingAttribute}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full transition-opacity duration-500 ${objectFit === 'cover' ? 'object-cover' : `object-${objectFit}`} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        width={dimensions.width}
        height={dimensions.height}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
} 
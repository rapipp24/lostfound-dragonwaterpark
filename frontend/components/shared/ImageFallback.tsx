import React from "react";

export default function ImageFallback({ src, alt, className = "" }: { src?: string, alt: string, className?: string }) {
  if (!src) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`}>
        No Image Available
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} />;
}

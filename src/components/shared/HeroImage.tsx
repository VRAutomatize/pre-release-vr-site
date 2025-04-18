
import React from 'react';

interface HeroImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

const HeroImage = ({
  src = "/lovable-uploads/feb0a32a-fd43-4f11-a6eb-b9c493b7e77e.png",
  alt = "Profissional com laptop",
  className = "w-1/2 h-auto object-contain" // Changed from w-full to w-1/2
}: HeroImageProps) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      loading="lazy"
      decoding="async"
    />
  );
};

export default React.memo(HeroImage);

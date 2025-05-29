
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface OptimizedHeroImageProps {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

const OptimizedHeroImage = ({
  src = "/lovable-uploads/feb0a32a-fd43-4f11-a6eb-b9c493b7e77e.png",
  alt = "Profissional com laptop",
  className = "w-2/3 h-auto object-contain",
  priority = false
}: OptimizedHeroImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const isMobile = useIsMobile();

  // Para mobile, usamos uma versão otimizada menor
  const mobileSrc = isMobile ? src : src;
  
  useEffect(() => {
    if (priority) {
      // Pre-load para imagens críticas
      const img = new Image();
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
      img.src = mobileSrc;
    }
  }, [mobileSrc, priority]);

  if (error) {
    return (
      <div className={`${className} bg-gray-800/20 animate-pulse rounded-lg flex items-center justify-center`}>
        <span className="text-gray-500">Imagem indisponível</span>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {!loaded && !priority && (
        <div className="absolute inset-0 bg-gray-800/20 animate-pulse rounded-lg" />
      )}
      <img 
        src={mobileSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded || priority ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default React.memo(OptimizedHeroImage);

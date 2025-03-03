
import React from 'react';

const HeroImage = () => {
  return (
    <img 
      src="/lovable-uploads/feb0a32a-fd43-4f11-a6eb-b9c493b7e77e.png"
      alt="Profissional com laptop"
      className="w-[60%] h-auto object-contain mx-auto"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
    />
  );
};

export default React.memo(HeroImage);

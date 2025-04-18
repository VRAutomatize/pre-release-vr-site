
import React, { useState, useRef } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemover';

interface BackgroundRemoverProps {
  defaultImage?: string;
  onImageProcessed?: (blob: Blob) => void;
}

const BackgroundRemover: React.FC<BackgroundRemoverProps> = ({ 
  defaultImage = "/lovable-uploads/0b4e9ef3-55f1-4f23-bd1a-eac74bd0bf8d.png",
  onImageProcessed 
}) => {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveBackground = async (imageUrl: string) => {
    try {
      const img = await loadImage(await (await fetch(imageUrl)).blob());
      const blob = await removeBackground(img);
      const processedUrl = URL.createObjectURL(blob);
      setProcessedImage(processedUrl);
      onImageProcessed?.(blob);
    } catch (error) {
      console.error('Background removal failed:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = await loadImage(file);
      const blob = await removeBackground(img);
      const processedUrl = URL.createObjectURL(blob);
      setProcessedImage(processedUrl);
      onImageProcessed?.(blob);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img 
        src={processedImage || defaultImage} 
        alt="Background removed" 
        className="w-48 h-48 object-contain animate-pulse-slow"
      />
      <div className="mt-4 flex space-x-2">
        <button 
          onClick={() => handleRemoveBackground(defaultImage)}
          className="bg-gold hover:bg-gold-light text-background rounded-lg px-4 py-2"
        >
          Remover Fundo Atual
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload}
          accept="image/*" 
          className="hidden"
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-gold/20 hover:bg-gold/30 text-gold rounded-lg px-4 py-2"
        >
          Carregar Nova Imagem
        </button>
      </div>
    </div>
  );
};

export default BackgroundRemover;

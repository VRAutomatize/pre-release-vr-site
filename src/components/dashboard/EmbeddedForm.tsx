
import React, { useMemo, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

interface EmbeddedFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  formUrl: string;
}

export function EmbeddedForm({
  isOpen,
  onClose,
  title,
  description,
  formUrl,
}: EmbeddedFormProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  // Inject custom styles when the form is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.classList.add('form-overlay-open');
    } else {
      document.body.classList.remove('form-overlay-open');
    }
    
    return () => {
      document.body.classList.remove('form-overlay-open');
    };
  }, [isOpen, isMobile]);
  
  // Reset loading state when form opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);
  
  // Modificar URL para desativar tema do n8n e forçar tema escuro/transparente
  const enhancedFormUrl = useMemo(() => {
    // Validar se formUrl é uma URL válida
    try {
      // Check if formUrl is empty or undefined
      if (!formUrl || formUrl.trim() === '') {
        return '';
      }
      
      // Check if URL has protocol, if not add https://
      const urlToProcess = formUrl.startsWith('http') ? formUrl : `https://${formUrl}`;
      const url = new URL(urlToProcess);
      
      // Adicionar parâmetros para desativar tema padrão e definir tema escuro
      url.searchParams.set('disableTheme', 'true');
      url.searchParams.set('darkMode', 'true');
      url.searchParams.set('embedWithoutTheme', 'true');
      url.searchParams.set('transparentBackground', 'true'); // Adicional para tentar forçar transparência
      
      return url.toString();
    } catch (error) {
      console.error("Invalid URL provided:", formUrl);
      // Return the original URL if invalid
      return formUrl;
    }
  }, [formUrl]);

  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
      aria-describedby="form-description"
    >
      {/* Visually hidden title and description for accessibility */}
      <h2 id="form-title" className="sr-only">{title}</h2>
      <p id="form-description" className="sr-only">{description || "Form embedded from external source"}</p>
      
      {/* Form Container */}
      <div className={`relative ${isMobile ? 'w-full h-full' : 'w-[95vw] h-[90vh] sm:w-[90vw] sm:h-[85vh]'} max-w-5xl`}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 z-[60] rounded-full bg-black/50 p-1.5 text-gold hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        
        {/* Loading indicator */}
        {isLoading && isMobile && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1A1F2C] z-10">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Iframe Container with stronger background for mobile */}
        <div 
          className={`w-full h-full overflow-hidden rounded-lg ${isMobile ? 'bg-[#1A1F2C]' : ''}`} 
          style={{ backgroundColor: isMobile ? '#1A1F2C' : 'transparent' }}
        >
          {formUrl ? (
            <iframe
              src={enhancedFormUrl}
              className={`w-full h-full ${isMobile ? 'bg-[#1A1F2C]' : 'bg-transparent'}`} 
              title={title}
              frameBorder="0"
              style={{ 
                backgroundColor: isMobile ? '#1A1F2C' : 'transparent',
                background: isMobile ? '#1A1F2C' : 'transparent',
                overflow: "hidden",
                opacity: isLoading && isMobile ? 0 : 1,
                transition: "opacity 0.3s ease-in-out"
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              onLoad={() => setIsLoading(false)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <p>URL de formulário inválida</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

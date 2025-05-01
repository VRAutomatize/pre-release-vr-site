
import React, { useMemo } from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  // Modificar URL para desativar tema do n8n e forçar tema escuro/transparente
  const enhancedFormUrl = useMemo(() => {
    const url = new URL(formUrl);
    // Adicionar parâmetros para desativar tema padrão e definir tema escuro
    url.searchParams.set('disableTheme', 'true');
    url.searchParams.set('darkMode', 'true');
    return url.toString();
  }, [formUrl]);

  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
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
          className="absolute right-3 top-3 z-[60] rounded-full bg-black/20 p-1.5 text-gold hover:bg-black/40 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        
        {/* Iframe Container - Adicionando uma camada extra para garantir transparência */}
        <div className={`w-full h-full overflow-hidden rounded-lg ${isMobile ? 'bg-[#1A1F2C]/95' : ''}`}>
          <iframe
            src={enhancedFormUrl}
            className={`w-full h-full ${isMobile ? 'bg-transparent !bg-transparent' : 'bg-transparent'}`}
            title={title}
            frameBorder="0"
            style={{ 
              backgroundColor: "transparent",
              background: "transparent",
              overflow: "hidden"
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          />
        </div>
      </div>
    </div>
  );
}

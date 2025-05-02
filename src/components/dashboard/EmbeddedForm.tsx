
import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { DirectFormRenderer } from "./DirectFormRenderer";

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
  
  // Always use our custom form renderer for supported forms
  const useDirectRenderer = useMemo(() => {
    return formUrl.includes("gerar_venda") || 
           formUrl.includes("notifica_time_comercial");
  }, [formUrl]);
  
  // Inject custom styles when the form is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('form-overlay-open');
    } else {
      document.body.classList.remove('form-overlay-open');
    }
    
    return () => {
      document.body.classList.remove('form-overlay-open');
    };
  }, [isOpen]);

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
        
        {/* Content Renderer - Always use Direct Renderer for supported forms */}
        {useDirectRenderer ? (
          // Use our custom direct form renderer for all devices
          <div className="w-full h-full overflow-hidden rounded-lg bg-[#1A1F2C]">
            <DirectFormRenderer formUrl={formUrl} onClose={onClose} />
          </div>
        ) : (
          // Fallback to iframe for unsupported forms
          <>
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1A1F2C] z-10">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Iframe Container */}
            <div 
              className="w-full h-full overflow-hidden rounded-lg bg-[#1A1F2C]"
            >
              {formUrl ? (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p>External forms are not supported. Please use our custom forms.</p>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p>URL de formulário inválida</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  // Keep media query for potential responsive adjustments
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
      <div className="relative w-[95vw] h-[90vh] sm:w-[90vw] sm:h-[85vh] max-w-5xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 z-[60] rounded-full bg-black/20 p-1.5 text-gold hover:bg-black/40 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        
        {/* Iframe Container */}
        <div className="w-full h-full overflow-hidden rounded-lg">
          <iframe
            src={formUrl}
            className="w-full h-full bg-transparent"
            title={title}
            frameBorder="0"
            style={{ 
              backgroundColor: "transparent",
              background: "transparent",
              overflow: "hidden"
            }}
            allowTransparency
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          />
        </div>
      </div>
    </div>
  );
}


import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="sm:max-w-4xl w-[95vw] h-[85vh] p-0 overflow-hidden border-gold/20 bg-[rgba(0,0,0,0)]"
        >
          {/* Visually hidden title and description for accessibility */}
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">{description || "Form embedded from external source"}</DialogDescription>
          
          <div className="absolute right-4 top-4 z-[60]">
            <button 
              onClick={onClose}
              className="rounded-full bg-black/20 p-1.5 text-gold hover:bg-black/40 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="w-full h-full overflow-hidden">
            <iframe
              src={formUrl}
              className="w-full h-full"
              title={title}
              frameBorder="0"
              style={{ 
                backgroundColor: "transparent",
                overflow: "hidden"
              }}
              allowTransparency
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose} shouldScaleBackground>
      <DrawerContent 
        className="h-[90vh] max-h-[95vh] p-0 rounded-t-xl overflow-hidden bg-[rgba(0,0,0,0)] !bg-transparent border-t-0"
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          background: "rgba(0,0,0,0)"
        }}
      >
        {/* Custom handle that's more subtle */}
        <div className="mx-auto mt-1.5 h-1.5 w-12 rounded-full bg-gold/30" />
        
        <DrawerClose className="absolute right-4 top-4 z-[60]">
          <div className="rounded-full bg-black/20 p-1.5">
            <X className="h-4 w-4 text-gold" />
          </div>
        </DrawerClose>
        
        <div className="w-full h-full overflow-hidden">
          <iframe
            src={formUrl}
            className="w-full h-full"
            title={title}
            frameBorder="0"
            style={{ 
              backgroundColor: "transparent",
              overflow: "hidden"
            }}
            allowTransparency
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

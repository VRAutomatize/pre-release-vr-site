
import React from "react";
import {
  Dialog,
  DialogContent,
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
  formUrl,
}: EmbeddedFormProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-4xl h-[80vh] p-0 border-gold/20 bg-transparent"
        >
          <div className="flex-1 overflow-hidden h-full">
            <iframe
              src={formUrl}
              className="w-full h-full border-0"
              title={title}
              style={{ backgroundColor: "transparent" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose} shouldScaleBackground>
      <DrawerContent 
        className="h-[100vh] max-h-[100vh] rounded-none bg-transparent"
      >
        <DrawerClose className="absolute right-4 top-4 z-50">
          <X className="h-4 w-4 text-gold" />
        </DrawerClose>
        <div className="flex-1 overflow-hidden h-full px-0">
          <iframe
            src={formUrl}
            className="w-full h-full border-0"
            title={title}
            style={{ backgroundColor: "transparent" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

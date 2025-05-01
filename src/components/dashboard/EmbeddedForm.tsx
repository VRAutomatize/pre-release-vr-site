
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <DialogHeader className="p-6 border-b border-gold/20">
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <iframe
              src={formUrl}
              className="w-full h-[calc(80vh-120px)] border-0"
              title={title}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[100vh] max-h-[100vh] rounded-none">
        <DrawerHeader className="border-b border-gold/20">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
          <DrawerClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 overflow-hidden px-0">
          <iframe
            src={formUrl}
            className="w-full h-[calc(100vh-120px)] border-0"
            title={title}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

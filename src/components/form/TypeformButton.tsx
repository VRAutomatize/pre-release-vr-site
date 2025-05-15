
import React from "react";
import { Button } from "@/components/ui/button";
import { useTypeform } from "@/contexts/TypeformContext";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TypeformButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  icon?: LucideIcon;
}

export function TypeformButton({ 
  className, 
  variant = "default", 
  size = "default",
  children,
  icon: Icon
}: TypeformButtonProps) {
  const { openModal } = useTypeform();
  
  return (
    <Button 
      className={cn(className)} 
      onClick={openModal}
      variant={variant}
      size={size}
    >
      {Icon && <Icon className="mr-2 h-5 w-5 flex-shrink-0" />}
      {children}
    </Button>
  );
}

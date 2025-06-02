
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NativeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
}

const NativeCard = forwardRef<HTMLDivElement, NativeCardProps>(
  ({ className, variant = "default", padding = "md", interactive = false, children, ...props }, ref) => {
    const baseClasses = "rounded-xl transition-all duration-200";
    
    const variants = {
      default: "bg-gray-800/50 border border-gray-700/50",
      elevated: "bg-gray-800 shadow-lg border border-gray-700/30",
      outlined: "bg-transparent border-2 border-yellow-400/20",
      glass: "bg-gray-900/30 backdrop-blur-xl border border-yellow-400/10"
    };
    
    const paddings = {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6"
    };
    
    const interactiveClasses = interactive 
      ? "native-touch native-press native-hover cursor-pointer" 
      : "";
    
    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          paddings[padding],
          interactiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NativeCard.displayName = "NativeCard";

export { NativeCard };

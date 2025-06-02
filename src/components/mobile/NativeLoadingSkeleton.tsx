
import React from "react";
import { cn } from "@/lib/utils";

interface NativeLoadingSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "button";
  lines?: number;
}

const NativeLoadingSkeleton = ({ 
  className, 
  variant = "text", 
  lines = 1 
}: NativeLoadingSkeletonProps) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 bg-[length:200%_100%] animate-[shimmer_2s_infinite]";

  const variants = {
    card: "h-24 rounded-xl",
    text: "h-4 rounded-md",
    circle: "rounded-full aspect-square",
    button: "h-12 rounded-lg"
  };

  if (variant === "card") {
    return (
      <div className={cn(baseClasses, variants.card, className)}>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-700/30 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700/30 rounded w-1/2"></div>
          <div className="h-8 bg-gray-700/30 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variants[variant],
              index === lines - 1 && "w-3/4",
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, variants[variant], className)} />
  );
};

export default NativeLoadingSkeleton;

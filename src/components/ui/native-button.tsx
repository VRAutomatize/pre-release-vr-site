
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useHapticFeedback } from "@/components/mobile/NativeHapticFeedback";

interface NativeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  hapticFeedback?: boolean;
}

const NativeButton = forwardRef<HTMLButtonElement, NativeButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    fullWidth = false, 
    loading = false, 
    hapticFeedback = true,
    onClick,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const { triggerHaptic } = useHapticFeedback();
    
    const baseClasses = "native-touch native-press inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";
    
    const variants = {
      primary: "bg-yellow-400 text-gray-900 hover:bg-yellow-300 focus:ring-yellow-400 shadow-md active:bg-yellow-500",
      secondary: "bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500 shadow-sm active:bg-gray-800",
      ghost: "bg-transparent text-yellow-400 hover:bg-yellow-400/10 focus:ring-yellow-400 active:bg-yellow-400/20",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-md active:bg-red-700"
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm rounded-md",
      md: "h-11 px-4 text-base",
      lg: "h-12 px-6 text-lg"
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (hapticFeedback && !disabled && !loading) {
        triggerHaptic('light');
      }
      onClick?.(e);
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
        
        {/* Ripple effect overlay */}
        <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-200 rounded-lg active:opacity-100 pointer-events-none" />
      </button>
    );
  }
);

NativeButton.displayName = "NativeButton";

export { NativeButton };

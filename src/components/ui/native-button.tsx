
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NativeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

const NativeButton = forwardRef<HTMLButtonElement, NativeButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, loading = false, children, disabled, ...props }, ref) => {
    const baseClasses = "native-touch native-press inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-yellow-400 text-gray-900 hover:bg-yellow-300 focus:ring-yellow-400 shadow-md",
      secondary: "bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500 shadow-sm",
      ghost: "bg-transparent text-yellow-400 hover:bg-yellow-400/10 focus:ring-yellow-400",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-md"
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm rounded-md",
      md: "h-11 px-4 text-base",
      lg: "h-12 px-6 text-lg"
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
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

NativeButton.displayName = "NativeButton";

export { NativeButton };

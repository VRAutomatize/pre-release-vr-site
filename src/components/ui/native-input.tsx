
import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface NativeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const NativeInput = forwardRef<HTMLInputElement, NativeInputProps>(
  ({ className, type, label, error, helper, leftIcon, rightIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-200 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400",
              leftIcon && "pl-10",
              (rightIcon || isPassword) && "pr-10",
              error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
              isFocused && "bg-gray-800/80 border-yellow-400/50",
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          
          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
        
        {helper && !error && (
          <p className="mt-1 text-sm text-gray-400">{helper}</p>
        )}
      </div>
    );
  }
);

NativeInput.displayName = "NativeInput";

export { NativeInput };

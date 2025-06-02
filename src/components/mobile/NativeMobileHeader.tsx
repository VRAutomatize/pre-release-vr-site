
import React from "react";
import { ArrowLeft, Bell, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NativeButton } from "@/components/ui/native-button";

interface NativeMobileHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
  transparent?: boolean;
}

const NativeMobileHeader = ({ 
  title, 
  subtitle,
  showBackButton = false, 
  actions,
  transparent = false 
}: NativeMobileHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        transparent 
          ? "bg-transparent" 
          : "bg-gray-900/95 backdrop-blur-xl border-b border-yellow-400/10"
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between px-4 py-3 h-16">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {showBackButton ? (
            <NativeButton
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="h-10 w-10 p-0 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </NativeButton>
          ) : (
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/2a347c53-83d5-4886-b387-c38347ea3fbc.png" 
                alt="VR Link" 
                className="h-8 w-8 object-contain"
              />
              {title && (
                <div className="flex flex-col min-w-0">
                  <h1 className="text-lg font-semibold text-yellow-400 truncate">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-xs text-gray-400 truncate">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {actions || (
            <>
              <NativeButton
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 rounded-full relative"
              >
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-gray-900" />
              </NativeButton>
              
              <div className="h-8 w-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-900">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NativeMobileHeader;

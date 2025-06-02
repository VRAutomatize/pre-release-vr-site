
import React from "react";
import { ArrowLeft, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface MobileHeaderProps {
  title?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
}

const MobileHeader = ({ title, showBackButton = false, actions }: MobileHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-gold/20 safe-area-pt">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/2a347c53-83d5-4886-b387-c38347ea3fbc.png" 
                alt="VR Link" 
                className="h-8 w-8 object-contain"
              />
              {title && (
                <h1 className="text-lg font-semibold text-gold truncate">
                  {title}
                </h1>
              )}
            </div>
          )}
        </div>

        {/* Center - Title if back button is shown */}
        {showBackButton && title && (
          <h1 className="text-lg font-semibold text-gold truncate">
            {title}
          </h1>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {actions || (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gold">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;

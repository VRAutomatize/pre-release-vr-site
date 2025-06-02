
import React from "react";
import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import UserProfileMenu from "./UserProfileMenu";

interface MobileHeaderProps {
  title?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
}

const MobileHeader = ({ title, showBackButton = false, actions }: MobileHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-gold/10 safe-area-pt w-full">
      <div className="flex items-center justify-between px-2 py-2 h-12 w-full">
        {/* Left Side */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-8 w-8 flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          ) : (
            <img 
              src="/lovable-uploads/2a347c53-83d5-4886-b387-c38347ea3fbc.png" 
              alt="VR Link" 
              className="h-8 w-8 object-contain flex-shrink-0"
            />
          )}
          
          {title && (
            <h1 className="text-base font-semibold text-gold truncate ml-1">
              {title}
            </h1>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {actions || (
            <>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
              <UserProfileMenu>
                <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center ml-1 cursor-pointer">
                  <span className="text-xs font-medium text-gold">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              </UserProfileMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;

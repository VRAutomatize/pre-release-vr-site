
import React from "react";
import { LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface UserProfileMenuProps {
  children: React.ReactNode;
}

const UserProfileMenu = ({ children }: UserProfileMenuProps) => {
  const { logout, user } = useAuth();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-gray-800 border-yellow-400/20">
        <ContextMenuItem className="text-gray-100 focus:bg-yellow-400/10 focus:text-yellow-400">
          <User className="h-4 w-4 mr-2" />
          {user?.name || "Usuário"}
        </ContextMenuItem>
        <ContextMenuItem className="text-gray-100 focus:bg-yellow-400/10 focus:text-yellow-400">
          <Settings className="h-4 w-4 mr-2" />
          Configurações
        </ContextMenuItem>
        <ContextMenuItem 
          className="text-red-400 focus:bg-red-400/10 focus:text-red-400"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default UserProfileMenu;

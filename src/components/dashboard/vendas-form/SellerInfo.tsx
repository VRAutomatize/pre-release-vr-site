
import React from "react";
import { User } from "../../../contexts/AuthContext";

interface SellerInfoProps {
  user: User | null;
  getSellerTag: () => string;
}

export function SellerInfo({ user, getSellerTag }: SellerInfoProps) {
  if (!user) return null;
  
  return (
    <div className="mb-4 px-3 py-2 bg-gold/5 border border-gold/10 rounded-md">
      <p className="text-sm text-gold/80">
        Vendedor: <span className="font-medium text-gold">{user.name}</span>
        {getSellerTag() && (
          <span className="text-xs ml-2 text-gold/60">({getSellerTag()})</span>
        )}
      </p>
    </div>
  );
}

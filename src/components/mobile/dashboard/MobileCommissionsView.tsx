
import React from "react";
import CommissionsPanel from "@/components/dashboard/CommissionsPanel";

const MobileCommissionsView = () => {
  return (
    <div className="w-full">
      <div className="py-3 border-b border-gold/5">
        <div className="px-3">
          <h2 className="text-xl font-bold text-gold mb-1">Comissões</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas comissões e solicite saques
          </p>
        </div>
      </div>
      <div className="px-3 py-3">
        <CommissionsPanel />
      </div>
    </div>
  );
};

export default MobileCommissionsView;

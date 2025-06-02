
import React from "react";
import ResourcesPanel from "@/components/dashboard/ResourcesPanel";

const MobileResourcesView = () => {
  return (
    <div className="w-full">
      <div className="py-3 border-b border-gold/5">
        <div className="px-3">
          <h2 className="text-xl font-bold text-gold mb-1">Recursos</h2>
          <p className="text-sm text-muted-foreground">
            Materiais e ferramentas para suas vendas
          </p>
        </div>
      </div>
      <div className="px-3 py-3">
        <ResourcesPanel />
      </div>
    </div>
  );
};

export default MobileResourcesView;


import React from "react";
import ClientLogos from "@/components/ClientLogos";
import { Building2 } from "lucide-react";

const ClientLogosSection = () => {
  return (
    <section className="section-edge border-b border-gold/10 py-8 md:py-12">
      <div className="content-container-tight">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-5 w-5 text-gold" />
            <h3 className="text-xl font-semibold text-gold">
              Empresas que já transformaram seus resultados
            </h3>
          </div>
          <p className="text-foreground/70">
            Mais de 200 empresas já economizam 6 dígitos com nossos funcionários digitais
          </p>
        </div>
      </div>
      <ClientLogos />
    </section>
  );
};

export default ClientLogosSection;

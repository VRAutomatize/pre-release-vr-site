
import React from "react";
import { Users, Target } from "lucide-react";
import { PremiumCard, PremiumButton } from "../PremiumComponents";

const AuthorityCTA: React.FC = () => {
  return (
    <div className="text-center">
      <PremiumCard className="p-12 bg-gradient-to-r from-premium-gold/10 to-premium-blue/10">
        <Users className="w-16 h-16 text-premium-gold mx-auto mb-6" />
        <h3 className="executive-display-medium mb-6">
          Acesse Nosso Conhecimento Exclusivo
        </h3>
        <p className="executive-body-large mb-8 max-w-3xl mx-auto">
          Junte-se a mais de 200 CEOs que já acessaram nossos frameworks proprietários
        </p>
        <PremiumButton variant="primary" className="text-xl px-12 py-6">
          <Target className="mr-4 h-6 w-6" />
          Acessar Recursos Executivos
        </PremiumButton>
        
        <div className="mt-8 text-center">
          <p className="executive-body-small">
            ✓ Acesso imediato • ✓ Conteúdo atualizado mensalmente • ✓ Suporte executivo
          </p>
        </div>
      </PremiumCard>
    </div>
  );
};

export default AuthorityCTA;

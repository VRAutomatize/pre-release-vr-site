import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { PricingCard } from "./pricing/PricingCard";
import { PricingFeatures } from "./pricing/PricingFeatures";
import { features, plans } from "./pricing/pricingData";
import { getBasicFeatures, getProFeatures, getPremiumFeatures } from "@/utils/pricing";

const PricingCards = ({ isAnnual }: { isAnnual: boolean }) => {
  const basicFeatures = getBasicFeatures(features);
  const proFeatures = getProFeatures(features);
  const premiumFeatures = getPremiumFeatures(features);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mt-12">
      <PricingCard
        plan={plans[0]}
        features={basicFeatures}
        isAnnual={isAnnual}
        index={0}
      />
      <PricingCard
        plan={plans[1]}
        features={proFeatures}
        isAnnual={isAnnual}
        index={1}
        showBasicPrefix
      />
      <PricingCard
        plan={plans[2]}
        features={premiumFeatures}
        isAnnual={isAnnual}
        index={2}
        showProPrefix
      />
    </div>
  );
};

const PricingTable = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6">
            Nossos Planos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha o Plano Ideal para Seu Negócio
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-4">
            Soluções flexíveis que crescem junto com sua empresa
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-gold" />
            <p className="text-lg font-semibold text-gold">
              Mensagens ilimitadas. Não pague por conversa!
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-base font-medium ${!isAnnual ? "text-gold" : "text-foreground/60"}`}>
              Mensal
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-gold data-[state=unchecked]:bg-input h-[24px] w-[44px]"
            />
            <span className={`text-base font-medium ${isAnnual ? "text-gold" : "text-foreground/60"}`}>
              Anual
              <span className="ml-2 text-sm text-gold">(-30%)</span>
            </span>
          </div>
        </div>

        <PricingCards isAnnual={isAnnual} />
        <PricingFeatures isAnnual={isAnnual} />
      </div>
    </section>
  );
};

export default PricingTable;
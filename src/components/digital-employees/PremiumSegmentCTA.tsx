
import React from "react";
import { Crown, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ExecutiveButton } from "@/components/form/ExecutiveButton";
import { TypeformButton } from "@/components/form/TypeformButton";

const PremiumSegmentCTA = () => {
  return (
    <div className="space-y-6">
      {/* Premium Call-to-Action for High-Value Leads */}
      <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50/10 to-amber-100/5 backdrop-blur-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Crown className="h-6 w-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-yellow-400">Atendimento Executivo</h3>
        </div>
        <p className="text-foreground/90 mb-6">
          Para empresários com faturamento acima de <span className="font-bold text-yellow-400">R$ 500k/mês</span>:
          Reunião estratégica personalizada com nossos especialistas seniores.
        </p>
        <div className="flex justify-center">
          <ExecutiveButton
            icon={Calendar}
            trackingId="executive_calendar"
            trackingSection="premium_segment"
            trackingMetadata={{
              leadType: "premium",
              expectedRevenue: "500k+",
              priority: "high"
            }}
            variant="calendar"
            className="px-8 py-3"
          >
            Reunião Executiva
          </ExecutiveButton>
        </div>
      </Card>

      {/* Standard Flow Option */}
      <div className="text-center">
        <p className="text-foreground/70 mb-4">
          Ou continue com nossa <span className="text-gold">análise gratuita personalizada</span>:
        </p>
        <TypeformButton
          className="bg-gold hover:bg-gold-light text-background px-8 py-4 text-lg"
          trackingId="standard_flow_after_premium"
          trackingSection="premium_segment"
          trackingMetadata={{
            leadType: "standard",
            afterPremiumOffer: true
          }}
        >
          Agendar Consulta Gratuita
        </TypeformButton>
      </div>
    </div>
  );
};

export default PremiumSegmentCTA;


import React from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle } from "lucide-react";
import { PremiumCard, PremiumButton, PremiumBadge } from "../PremiumComponents";

interface Methodology {
  name: string;
  description: string;
  applications: string;
  success_rate: string;
  certification: string;
  highlights: string[];
}

interface MethodologyCardProps {
  methodology: Methodology;
  index: number;
}

const MethodologyCard: React.FC<MethodologyCardProps> = ({ methodology, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <PremiumCard className="p-8">
        <div className="premium-grid-2 gap-8">
          
          {/* Methodology Info */}
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 bg-premium-gold/20 rounded-2xl">
                <BookOpen className="w-8 h-8 text-premium-gold" />
              </div>
              <div>
                <h4 className="executive-body-medium font-bold text-white mb-2">
                  {methodology.name}
                </h4>
                <PremiumBadge variant="gold" size="sm">
                  {methodology.certification}
                </PremiumBadge>
              </div>
            </div>

            <p className="text-white/80 mb-6 leading-relaxed">
              {methodology.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="premium-card-glass p-4 text-center">
                <div className="text-premium-gold font-bold text-xl mb-1">
                  {methodology.applications}
                </div>
                <div className="text-white/60 text-xs">Aplicações</div>
              </div>
              
              <div className="premium-card-glass p-4 text-center">
                <div className="text-premium-green font-bold text-xl mb-1">
                  {methodology.success_rate}
                </div>
                <div className="text-white/60 text-xs">Taxa de Sucesso</div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h5 className="text-white font-semibold mb-6">Diferenciais do Framework</h5>
            
            <div className="space-y-4">
              {methodology.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-premium-green flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PremiumButton variant="secondary" className="w-full">
                <BookOpen className="mr-3 h-5 w-5" />
                Conhecer Metodologia
              </PremiumButton>
            </div>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  );
};

export default MethodologyCard;

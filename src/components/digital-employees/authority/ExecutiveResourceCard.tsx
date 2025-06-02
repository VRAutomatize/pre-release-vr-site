
import React from "react";
import { motion } from "framer-motion";
import { Download, Play, Star } from "lucide-react";
import { PremiumCard, PremiumButton, PremiumBadge } from "../PremiumComponents";

interface ExecutiveResource {
  type: string;
  title: string;
  description: string;
  downloads: string;
  rating: number;
  cta: string;
}

interface ExecutiveResourceCardProps {
  resource: ExecutiveResource;
  index: number;
}

const ExecutiveResourceCard: React.FC<ExecutiveResourceCardProps> = ({ resource, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
    >
      <PremiumCard className="p-8 h-full">
        <div className="text-center">
          <div className="mb-4">
            <PremiumBadge variant="blue">
              {resource.type}
            </PremiumBadge>
          </div>
          
          <h4 className="executive-body-medium font-bold text-white mb-4">
            {resource.title}
          </h4>
          
          <p className="text-white/80 text-sm mb-6 leading-relaxed">
            {resource.description}
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(resource.rating) ? 'text-premium-gold fill-current' : 'text-gray-600'}`} />
              ))}
              <span className="text-white/60 text-sm ml-2">{resource.rating}</span>
            </div>
          </div>

          <p className="text-premium-gold text-sm font-semibold mb-6">
            {resource.downloads}
          </p>

          <PremiumButton variant="primary" className="w-full">
            {resource.type === "Webinar" ? (
              <Play className="mr-3 h-5 w-5" />
            ) : (
              <Download className="mr-3 h-5 w-5" />
            )}
            {resource.cta}
          </PremiumButton>
        </div>
      </PremiumCard>
    </motion.div>
  );
};

export default ExecutiveResourceCard;

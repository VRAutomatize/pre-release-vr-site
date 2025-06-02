
import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { PremiumCard } from "../PremiumComponents";

interface Recognition {
  title: string;
  source: string;
  logo: string;
}

interface RecognitionCardProps {
  recognition: Recognition;
  index: number;
}

const RecognitionCard: React.FC<RecognitionCardProps> = ({ recognition, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <PremiumCard className="p-6 text-center h-full">
        <div className="h-16 bg-white/10 rounded-lg mb-4 flex items-center justify-center">
          <Award className="w-8 h-8 text-premium-gold" />
        </div>
        
        <h5 className="text-white font-semibold text-sm mb-2">
          {recognition.title}
        </h5>
        
        <p className="text-white/60 text-xs">
          {recognition.source}
        </p>
      </PremiumCard>
    </motion.div>
  );
};

export default RecognitionCard;

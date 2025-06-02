
import React from "react";
import { motion } from "framer-motion";
import ConversionOptimizedHero from "./ConversionOptimizedHero";
import ElevatedBenefitsSection from "./ElevatedBenefitsSection";
import InteractiveROICalculator from "./InteractiveROICalculator";
import ObjectionEliminationSection from "./ObjectionEliminationSection";
import PremiumSocialProof from "./PremiumSocialProof";
import ComparisonSection from "./ComparisonSection";
import ProcessSection from "./ProcessSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import MobileStickyCTA from "./MobileStickyCTA";
import { sectionVariants } from "./DigitalEmployeesAnimations";

const ConversionOptimizedContent = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      
      {/* Hero Section Otimizada */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <ConversionOptimizedHero />
      </motion.div>

      {/* Benefits Section Elevada - Posição #2 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <ElevatedBenefitsSection />
      </motion.div>

      {/* ROI Calculator Interativo - Posição #3 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <InteractiveROICalculator />
      </motion.div>

      {/* Eliminação de Objeções - Posição #4 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <ObjectionEliminationSection />
      </motion.div>

      {/* Prova Social Premium - Posição #5 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <PremiumSocialProof />
      </motion.div>

      {/* Comparativo Visual - Posição #6 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <ComparisonSection />
      </motion.div>

      {/* Processo - Posição #7 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <ProcessSection />
      </motion.div>

      {/* FAQ - Posição #8 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <FAQSection />
      </motion.div>

      {/* CTA Final - Posição #9 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <CTASection />
      </motion.div>

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
};

export default ConversionOptimizedContent;

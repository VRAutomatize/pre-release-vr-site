
import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/digital-employees/HeroSection";
import ClientLogosSection from "@/components/digital-employees/ClientLogosSection";
import CTASection from "@/components/digital-employees/CTASection";
import UseCasesSection from "@/components/digital-employees/UseCasesSection";
import ProcessSection from "@/components/digital-employees/ProcessSection";
import ComparisonSection from "@/components/digital-employees/ComparisonSection";
import IdealForSection from "@/components/digital-employees/IdealForSection";
import PremiumSocialProof from "@/components/digital-employees/PremiumSocialProof";
import ROIChart from "@/components/digital-employees/ROIChart";
import FAQSection from "@/components/digital-employees/FAQSection";
import ExitIntentAlert from "@/components/digital-employees/ExitIntentAlert";
import QuickSocialProof from "@/components/digital-employees/QuickSocialProof";
import MicroCTA from "@/components/digital-employees/MicroCTA";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";
import MobileStickyCTA from "@/components/digital-employees/MobileStickyCTA";
import { useIsMobile } from "@/hooks/useIsMobile";

// Animation variants for scroll reveal
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const DigitalEmployees = () => {
  const { trackEvent } = useConversionAnalytics();
  const isMobile = useIsMobile();

  // Updated WhatsApp link with new number
  const whatsappLink = React.useCallback(() => "https://wa.me/554792666367?text=Olá!%20Tenho%20interesse%20em%20Funcionários%20Digitais!", []);

  const handleWhatsAppClick = React.useCallback(() => {
    trackEvent('whatsapp_click', 'click', 'header_whatsapp', 'header', {
      buttonText: 'Entre em contato',
      source: 'header_navigation',
    });
    window.open(whatsappLink(), '_blank');
  }, [trackEvent, whatsappLink]);

  const handleHomeClick = React.useCallback(() => {
    trackEvent('navigation_click', 'click', 'home_link', 'header', {
      destination: 'home',
      source: 'header_navigation',
    });
  }, [trackEvent]);

  // Scroll padding dinâmico baseado no dispositivo
  const scrollPaddingClass = isMobile ? "scroll-pt-16" : "scroll-pt-24";

  return (
    <div className={`min-h-screen bg-background overflow-x-hidden ${scrollPaddingClass}`}>
      {/* Exit Intent Alert */}
      <ExitIntentAlert />
      
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:text-gold transition-colors"
            onClick={handleHomeClick}
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <button
            onClick={handleWhatsAppClick}
            className="bg-gold hover:bg-gold-light text-background rounded-md px-4 py-2 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Entre em contato
          </button>
        </div>
      </Header>

      <div className="min-h-screen bg-background overflow-x-hidden mobile-full-width pt-20 md:pt-12 pb-24 md:pb-12">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="section-spacing-large"
        >
          <HeroSection />
        </motion.div>

        {/* Quick Social Proof - Right after hero */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing mobile-container-full"
        >
          <QuickSocialProof />
        </motion.div>

        {/* Client Logos Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing mobile-container-full"
        >
          <ClientLogosSection />
        </motion.div>

        {/* Micro CTA - Urgency */}
        <div className="mobile-container-tight">
          <div className="micro-cta-spacing">
            <MicroCTA variant="urgency" />
          </div>
        </div>

        {/* ROI Chart Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing-large mobile-container-tight"
          id="roi-chart-section"
        >
          <ROIChart />
        </motion.div>
        
        {/* Micro CTA - Calculator */}
        <div className="mobile-container-tight">
          <div className="micro-cta-spacing">
            <MicroCTA variant="calculator" />
          </div>
        </div>

        {/* Use Cases Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing-large mobile-container-tight"
          id="use-cases-section"
        >
          <UseCasesSection />
        </motion.div>

        {/* Micro CTA - Executive */}
        <div className="mobile-container-tight">
          <div className="micro-cta-spacing">
            <MicroCTA variant="executive" />
          </div>
        </div>
        
        {/* Premium Social Proof Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing-large mobile-container-tight"
          id="premium-social-proof"
        >
          <PremiumSocialProof />
        </motion.div>
        
        {/* Process Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing-large mobile-container-tight"
          id="process-section"
        >
          <ProcessSection />
        </motion.div>
        
        {/* Comparison Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing-large mobile-container-tight"
          id="comparison-section"
        >
          <ComparisonSection />
        </motion.div>

        {/* Micro CTA - Default */}
        <div className="mobile-container-tight">
          <div className="micro-cta-spacing">
            <MicroCTA variant="default" />
          </div>
        </div>
        
        {/* FAQ Section - Moved higher up */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing-large mobile-container-tight"
          id="faq-section"
        >
          <FAQSection />
        </motion.div>
        
        {/* Ideal For Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing-large mobile-container-tight"
          id="ideal-for-section"
        >
          <IdealForSection />
        </motion.div>
        
        {/* Final CTA Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section section-spacing mobile-container-tight"
        >
          <CTASection />
        </motion.div>
      </div>

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />

      <Footer />
    </div>
  );
};

export default DigitalEmployees;

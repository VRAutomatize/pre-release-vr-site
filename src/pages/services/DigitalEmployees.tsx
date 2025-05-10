
import React, { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/digital-employees/HeroSection";
import CTASection from "@/components/digital-employees/CTASection";
import UseCasesSection from "@/components/digital-employees/UseCasesSection";
import ProcessSection from "@/components/digital-employees/ProcessSection";
import ComparisonSection from "@/components/digital-employees/ComparisonSection";
import IdealForSection from "@/components/digital-employees/IdealForSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { TypeformModal } from "@/components/form/TypeformModal";
import { useTypeformModal } from "@/hooks/useTypeformModal";
import { motion } from "framer-motion";

// Add type definition for Window with Cal property
declare global {
  interface Window {
    Cal?: any;
  }
}

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
  // Configuration settings - usando URLs reais em produção
  const calendarLink = "https://cal.com/vrautomatize/call"; 
  // Em produção, substitua por um webhook real
  const webhookUrl = "https://webhook.site/your-webhook";
  
  const whatsappLink = React.useCallback(() => "https://wa.me/554788558257?text=Olá!%20Tenho%20interesse%20em%20Funcionários%20Digitais!", []);

  // Single instance of the typeform modal state
  const { isOpen, showCalendar, openModal, closeModal, showCalendarView } = useTypeformModal();

  // Smooth scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.reveal-section');
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        
        if (isVisible) {
          section.classList.add('is-visible');
        }
      });
    };
    
    // Initial check
    setTimeout(handleScroll, 100);
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <a 
            href={whatsappLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold-light text-background rounded-md px-4 py-2 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Entre em contato
          </a>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-12">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-24 md:mb-32"
        >
          <HeroSection calendarLink={calendarLink} webhookUrl={webhookUrl} openModal={openModal} />
        </motion.div>
        
        {/* Use Cases Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section mb-24 md:mb-32"
        >
          <UseCasesSection />
        </motion.div>
        
        {/* Process Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section mb-24 md:mb-32"
        >
          <ProcessSection />
        </motion.div>
        
        {/* Comparison Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section mb-24 md:mb-32"
        >
          <ComparisonSection />
        </motion.div>
        
        {/* Ideal For Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section mb-24 md:mb-32"
        >
          <IdealForSection />
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="reveal-section mb-16"
        >
          <CTASection calendarLink={calendarLink} webhookUrl={webhookUrl} />
        </motion.div>
      </div>

      {/* Single TypeformModal instance for the entire page */}
      <TypeformModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        calendarLink={calendarLink}
        webhookUrl={webhookUrl}
        showCalendar={showCalendar}
        onShowCalendar={showCalendarView}
      />

      <Footer />
    </div>
  );
};

export default DigitalEmployees;

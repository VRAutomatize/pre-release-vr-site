import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calculator, TrendingUp, Users, Calendar } from "lucide-react";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useEnhancedConversionAnalytics } from "@/hooks/useEnhancedConversionAnalytics";
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  description: string;
}
const PremiumMobileNav = () => {
  const {
    trackEvent
  } = useEnhancedConversionAnalytics();
  const {
    isScrolled
  } = useHeaderScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
      trackEvent('nav_section_click', 'click', sectionId, 'premium_nav', {
        fromSection: currentSection
      });
    }
  };
  const navItems: NavItem[] = [{
    id: 'advanced-roi-calculator',
    label: 'Calcular ROI',
    icon: Calculator,
    action: () => scrollToSection('advanced-roi-calculator'),
    description: 'Simule sua economia'
  }, {
    id: 'executive-assessment',
    label: 'Assessment',
    icon: TrendingUp,
    action: () => scrollToSection('executive-assessment'),
    description: 'Avalie seu perfil'
  }, {
    id: 'before-after-comparison',
    label: 'Comparar',
    icon: Users,
    action: () => scrollToSection('before-after-comparison'),
    description: 'Antes vs Depois'
  }, {
    id: 'process-section',
    label: 'Processo',
    icon: Calendar,
    action: () => scrollToSection('process-section'),
    description: 'Como funciona'
  }];

  // Track current section
  useEffect(() => {
    const sections = ['hero', 'advanced-roi-calculator', 'executive-assessment', 'before-after-comparison', 'process-section'];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px'
    });
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return <>
      {/* Premium Navigation Bar */}
      <motion.nav initial={{
      y: -100
    }} animate={{
      y: 0
    }} className={`nav-premium transition-all duration-500 ${isScrolled ? 'premium-glass-dark' : 'bg-background/20'}`}>
        <div className="container-premium">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{
            scale: 1.05
          }} className="flex items-center gap-3">
              
              <span className="text-gold font-bold text-lg premium-text-glow hidden sm:block">
                VR Automatize
              </span>
            </motion.div>

            {/* Current Section Indicator */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-xs text-foreground/60">Seção atual:</span>
              <span className="text-sm text-gold font-medium capitalize">
                {currentSection.replace('-', ' ')}
              </span>
            </div>

            {/* Menu Button */}
            <motion.button whileTap={{
            scale: 0.95
          }} onClick={() => setIsMenuOpen(!isMenuOpen)} className="premium-glass rounded-lg p-3 interactive-hover">
              <AnimatePresence mode="wait">
                {isMenuOpen ? <motion.div key="close" initial={{
                rotate: -90,
                opacity: 0
              }} animate={{
                rotate: 0,
                opacity: 1
              }} exit={{
                rotate: 90,
                opacity: 0
              }} transition={{
                duration: 0.2
              }}>
                    <X className="h-5 w-5 text-gold" />
                  </motion.div> : <motion.div key="menu" initial={{
                rotate: 90,
                opacity: 0
              }} animate={{
                rotate: 0,
                opacity: 1
              }} exit={{
                rotate: -90,
                opacity: 0
              }} transition={{
                duration: 0.2
              }}>
                    <Menu className="h-5 w-5 text-gold" />
                  </motion.div>}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Floating Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)} />

            {/* Menu Content */}
            <motion.div initial={{
          opacity: 0,
          y: -20,
          scale: 0.95
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          y: -20,
          scale: 0.95
        }} transition={{
          type: "spring",
          duration: 0.4
        }} className="fixed top-20 left-4 right-4 z-50 premium-glass-dark rounded-2xl p-6 animate-glow-pulse">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-gold premium-text-glow">
                    Navegação Inteligente
                  </h3>
                  <p className="text-sm text-foreground/70 mt-1">
                    Acesse as seções interativas
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {navItems.map((item, index) => <motion.button key={item.id} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }} onClick={item.action} className={`premium-glass rounded-xl p-4 text-left interactive-hover ${currentSection === item.id ? 'ring-2 ring-gold/50' : ''}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <item.icon className="h-5 w-5 text-gold" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      <p className="text-xs text-foreground/60">{item.description}</p>
                    </motion.button>)}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-4 border-t border-gold/20">
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>200+ empresas</span>
                    <span>R$ 283k economia</span>
                    <span>95% satisfação</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </>;
};
export default PremiumMobileNav;
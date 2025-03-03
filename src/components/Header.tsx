
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
}

// Header otimizado com memoização
const Header = React.memo(({ children }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handler de scroll otimizado com throttle
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Trigger logo animation after component mount
    const timeoutId = setTimeout(() => setIsLogoVisible(true), 500);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handlers memorizados para evitar recriações
  const handleLogoClick = useCallback(() => {
    if (location.pathname === '/') {
      // If already on home page, scroll to hero
      const heroSection = document.querySelector('section');
      heroSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If on another page, navigate to home and then scroll to hero
      navigate('/');
      setTimeout(() => {
        const heroSection = document.querySelector('section');
        heroSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.pathname, navigate]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    if (location.pathname !== '/') {
      // If not on homepage, navigate there first
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      // Already on homepage, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [location.pathname, navigate, isMenuOpen]);

  // Classes memorizadas
  const headerClasses = useMemo(() => `fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
    isScrolled ? "glass shadow-lg" : ""
  } rounded-xl mx-4`, [isScrolled]);

  const logoClasses = useMemo(() => `flex items-center gap-2 transition-all duration-500 ${
    isLogoVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
  } cursor-pointer`, [isLogoVisible]);

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div 
              className={logoClasses}
              onClick={handleLogoClick}
            >
              <img
                src="/lovable-uploads/62342ed0-cfb6-48e6-9064-63e2c615ec81.png"
                alt="VR Automatize"
                className="h-10 w-10"
                width="40"
                height="40"
              />
              <span className="text-xl font-semibold">VR Automatize</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {children || (
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('services')} 
                className="hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Benefícios
              </button>
              <a 
                href="#contact" 
                className="hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contato
              </a>
              <Button className="bg-gold hover:bg-gold-light text-background transition-all duration-300 transform hover:scale-105">
                Entre em contato
              </Button>
            </div>
          )}

          {/* Mobile Menu Button - Otimizado para evitar renderizações desnecessárias */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation - Renderização condicional otimizada */}
        {isMenuOpen && (
          <div className="md:hidden glass mt-4 rounded-lg p-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-gold transition-colors duration-300 text-left relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-1/2"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="hover:text-gold transition-colors duration-300 text-left relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-1/2"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-gold transition-colors duration-300 relative text-left after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-1/2"
            >
              Contato
            </button>
            <Button className="bg-gold hover:bg-gold-light text-background w-full transition-all duration-300 transform hover:scale-105">
              Entre em contato
            </Button>
          </div>
        )}
      </div>
    </header>
  );
});

export default Header;


import React, { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
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
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [location.pathname, navigate]);

  const mobileLinkClasses = "hover:text-gold transition-colors duration-300 text-left relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-1/2";

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-foreground"
        onClick={() => setIsMenuOpen(prev => !prev)}
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-blur mt-4 rounded-lg p-4 flex flex-col gap-4 border border-gold/20">
          <button onClick={() => scrollToSection('services')} className={mobileLinkClasses}>
            Serviços
          </button>
          <button onClick={() => scrollToSection('benefits')} className={mobileLinkClasses}>
            Benefícios
          </button>
          <button onClick={() => scrollToSection('contact')} className={mobileLinkClasses}>
            Contato
          </button>
          <a
            href="https://wa.me/5547988558257?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20VR%20Automatize!"
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gold hover:bg-gold-light text-background hover:text-background w-full transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2"
          >
            Entre em contato
          </a>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;

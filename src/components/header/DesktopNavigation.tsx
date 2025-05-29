
import React, { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DesktopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((sectionId: string) => {
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

  const linkClasses = "hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

  return (
    <div className="hidden md:flex items-center gap-8">
      <button onClick={() => scrollToSection('services')} className={linkClasses}>
        Serviços
      </button>
      <button onClick={() => scrollToSection('benefits')} className={linkClasses}>
        Benefícios
      </button>
      <a 
        href="#contact" 
        className={linkClasses}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('contact');
        }}
      >
        Contato
      </a>
      <a
        href="https://wa.me/5547988558257?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20VR%20Automatize!"
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-gold hover:bg-gold-light text-background hover:text-background transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2"
      >
        Entre em contato
      </a>
    </div>
  );
};

export default DesktopNavigation;

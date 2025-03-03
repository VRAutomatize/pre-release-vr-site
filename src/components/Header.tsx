
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useClerk, useAuth } from "@clerk/clerk-react";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Trigger logo animation after component mount
    setTimeout(() => setIsLogoVisible(true), 500);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
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
  };

  const scrollToSection = (sectionId: string) => {
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
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleAuthAction = () => {
    if (isSignedIn) {
      navigate('/profile');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : ""
      } rounded-xl mx-4`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div 
              className={`flex items-center gap-2 transition-all duration-500 ${
                isLogoVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              } cursor-pointer`}
              onClick={handleLogoClick}
            >
              <img
                src="/lovable-uploads/62342ed0-cfb6-48e6-9064-63e2c615ec81.png"
                alt="VR Automatize"
                className="h-10 w-10"
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
              <a href="#contact" className="hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                Contato
              </a>
              <Button
                onClick={() => handleAuthAction()}
                className="bg-gold hover:bg-gold-light text-background transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <User size={18} />
                {isSignedIn ? 'Meu Perfil' : 'Entrar'}
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
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
            <a
              href="#contact"
              className="hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-1/2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            <Button 
              onClick={() => {
                handleAuthAction();
                setIsMenuOpen(false);
              }}
              className="bg-gold hover:bg-gold-light text-background w-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center"
            >
              <User size={18} />
              {isSignedIn ? 'Meu Perfil' : 'Entrar'}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Trigger logo animation after component mount
    setTimeout(() => setIsLogoVisible(true), 500);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : ""
      } rounded-xl mx-4`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 transition-all duration-500 ${
              isLogoVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}>
              <img
                src="/lovable-uploads/62342ed0-cfb6-48e6-9064-63e2c615ec81.png"
                alt="VR Automatize"
                className="h-10 w-10"
              />
              <span className="text-xl font-semibold">VR Automatize</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="hover:text-gold transition-colors">
              Serviços
            </a>
            <a href="#benefits" className="hover:text-gold transition-colors">
              Benefícios
            </a>
            <a href="#contact" className="hover:text-gold transition-colors">
              Contato
            </a>
            <Button className="bg-gold hover:bg-gold-light text-background">
              Entre em contato
            </Button>
          </div>

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
            <a
              href="#services"
              className="hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </a>
            <a
              href="#benefits"
              className="hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefícios
            </a>
            <a
              href="#contact"
              className="hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            <Button className="bg-gold hover:bg-gold-light text-background w-full">
              Entre em contato
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
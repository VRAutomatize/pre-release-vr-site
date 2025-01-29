import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/lovable-uploads/62342ed0-cfb6-48e6-9064-63e2c615ec81.png"
              alt="VR Automatize"
              className="h-10 w-10"
            />
            <span className="text-xl font-semibold">VR Automatize</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-gold transition-colors">
              Recursos
            </a>
            <a href="#benefits" className="hover:text-gold transition-colors">
              Benefícios
            </a>
            <a href="#contact" className="hover:text-gold transition-colors">
              Contato
            </a>
            <Button className="bg-gold hover:bg-gold-light text-background">
              Começar Agora
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
              href="#features"
              className="hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Recursos
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
              Começar Agora
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
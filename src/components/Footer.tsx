import { Link } from "react-router-dom";
import { Mail, Copyright, Globe } from "lucide-react";
import { Separator } from "./ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card mt-24 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gold">VR Automate</h3>
            <p className="text-sm text-muted-foreground">
              Transformando negócios através da automação inteligente e soluções digitais inovadoras.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/ai-attendants" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Atendentes IA
                </Link>
              </li>
              <li>
                <Link to="/services/crm" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  CRM
                </Link>
              </li>
              <li>
                <Link to="/services/chatbots" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Chatbots
                </Link>
              </li>
              <li>
                <Link to="/services/automation" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Automação
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contato</h4>
            <div className="space-y-2">
              <a
                href="mailto:contato@vrautomate.com.br"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Mail className="h-4 w-4" />
                contato@vrautomate.com.br
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Redes Sociais</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/vrautomate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/vrautomate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Copyright className="h-4 w-4" />
            <span>{currentYear} VR Automate. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              Termos de Uso
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>PT-BR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
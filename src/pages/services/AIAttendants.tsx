
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Users, Clock, Database, Brain, Shield, Check, CreditCard, ArrowRight, LayoutDashboard, Settings, Monitor, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import MessagesCounter from "@/components/ai-attendants/MessagesCounter";
import PricingTable from "@/components/ai-attendants/PricingTable";
import FinalCTA from "@/components/crm/FinalCTA";
import Benefits from "@/components/Benefits";
import HeroTag from "@/components/shared/HeroTag";
import HeroTitle from "@/components/shared/HeroTitle";
import HeroDescription from "@/components/shared/HeroDescription";
import HeroActions from "@/components/shared/HeroActions";
import HeroImage from "@/components/shared/HeroImage";

const AIAttendants = () => {
  const whatsappLink = "https://wa.me/554788558257?text=Ol%C3%A1!%20Tenho%20interesse%20em%20atendentes%20de%20IA!";

  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold-light text-black rounded-md px-4 py-2 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Entre em contato
          </a>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-12 space-y-32">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center relative overflow-hidden mt-12">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <MessagesCounter className="mb-6 animate-fade-up" />
              
              <HeroTitle>
                Funcionários Digitais que Nunca Tiram Férias, 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light block mt-2">
                  Trabalham 24/7 e Não Pedem Aumento!
                </span>
              </HeroTitle>
              
              <HeroDescription>
                Economize até 73% com folha de pagamento enquanto multiplica a produtividade. Sem processos seletivos, 
                sem treinamentos demorados, sem burocracias trabalhistas.
              </HeroDescription>
              
              <HeroActions>
                <button 
                  onClick={() => scrollToSection('dashboard-preview')}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-black h-12 px-8"
                >
                  Ver Dashboard
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection('video-demo')}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 hover:bg-gold hover:text-black"
                >
                  Ver Demonstração
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
              </HeroActions>
            </div>
          </div>
        </section>
        
        {/* Dashboard Preview Section */}
        <section id="dashboard-preview" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-4">
                Interface Intuitiva
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Dashboard inteligente para <span className="text-gold">gerenciar seus atendentes</span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Acompanhe o desempenho dos seus Funcionários Digitais em tempo real. 
                Configure, personalize e otimize sem precisar de conhecimento técnico.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Main Dashboard Preview */}
              <div className="glass border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="bg-gold/10 p-3 rounded-lg">
                    <LayoutDashboard className="h-6 w-6 text-gold" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Dashboard Principal</h3>
                    <p className="text-foreground/70 text-sm mt-1">Visão geral completa dos seus atendimentos</p>
                  </div>
                </div>
                
                <div className="aspect-video rounded-lg bg-secondary/50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Monitor className="h-12 w-12 text-gold/50 mx-auto mb-4" />
                    <p className="text-foreground/50">Prévia do Dashboard Principal</p>
                  </div>
                </div>
                
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-gold mr-2" />
                    <span>Acompanhamento em tempo real de todos os atendimentos</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-gold mr-2" />
                    <span>Estatísticas de conversão e satisfação do cliente</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-gold mr-2" />
                    <span>Relatórios detalhados exportáveis em PDF</span>
                  </li>
                </ul>
              </div>
              
              {/* Settings Dashboard Preview */}
              <div className="glass border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="bg-gold/10 p-3 rounded-lg">
                    <Settings className="h-6 w-6 text-gold" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Tela de Configurações</h3>
                    <p className="text-foreground/70 text-sm mt-1">Personalização completa do seu Funcionário Digital</p>
                  </div>
                </div>
                
                <div className="aspect-video rounded-lg bg-secondary/50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Settings className="h-12 w-12 text-gold/50 mx-auto mb-4" />
                    <p className="text-foreground/50">Prévia da Tela de Configurações</p>
                  </div>
                </div>
                
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-gold mr-2" />
                    <span>Personalização da personalidade e tom do atendente</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-gold mr-2" />
                    <span>Configuração de respostas automáticas e scripts</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-gold mr-2" />
                    <span>Integração com seus sistemas e bases de conhecimento</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button asChild variant="outline" className="group">
                <button
                  onClick={() => scrollToSection('benefits')}
                  className="bg-background text-foreground hover:text-gold transition-colors"
                >
                  Ver benefícios dos Funcionários Digitais
                  <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Video Demonstration Section */}
        <section id="video-demo" className="py-20 bg-secondary/30 rounded-3xl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-4">
                Veja em Ação
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Demonstração do <span className="text-gold">Funcionário Digital</span> no WhatsApp
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Assista como nossos Funcionários Digitais atendem seus clientes de forma natural e eficiente, 
                resolvendo dúvidas e realizando vendas automaticamente.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-xl bg-secondary/70 overflow-hidden relative glass border border-gold/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MessageSquare className="h-16 w-16 text-gold/50 mx-auto mb-4" />
                    <p className="text-xl font-medium text-foreground/70">Vídeo de Demonstração</p>
                    <p className="text-foreground/50 mt-2">Assista ao vivo como o atendente interage com seus clientes</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-foreground/70 mb-4">Quer resultados como estes para seu negócio?</p>
                <Button asChild>
                  <button 
                    onClick={() => scrollToSection('pricing-table')}
                    className="bg-gold hover:bg-gold-light text-black"
                  >
                    Ver planos e preços
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </button>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Now using the updated component */}
        <Benefits />
        
        <section id="pricing-table">
          <PricingTable />
        </section>
        <FinalCTA whatsappLink={whatsappLink} />
      </div>
    </div>
  );
};

export default AIAttendants;

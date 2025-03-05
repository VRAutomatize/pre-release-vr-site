
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Users, Clock, Database, Brain, Shield, Check, CreditCard, ArrowRight } from "lucide-react";
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
            className="bg-gold hover:bg-gold-light text-background rounded-md px-4 py-2 flex items-center gap-2"
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
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background h-12 px-8"
                >
                  Contratar!
                </a>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 hover:bg-gold hover:text-background"
                >
                  Saiba Mais
                </a>
              </HeroActions>
            </div>
          </div>
        </section>
        
        {/* Redesigned Features Section - More concise and engaging */}
        <section className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-4">
                Vantagens Exclusivas
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Por que <span className="text-gold">Milhares</span> de Empresas Estão Migrando
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Key Advantage Cards */}
              <div className="glass p-6 rounded-lg transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl group">
                <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Clock className="text-gold w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Economize 73%</h3>
                <p className="text-foreground/70 text-sm mb-3">Elimine folha salarial, encargos trabalhistas e benefícios.</p>
                <a href="#benefits" className="text-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver mais <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="glass p-6 rounded-lg transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl group">
                <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Users className="text-gold w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3,5× Mais Produtivo</h3>
                <p className="text-foreground/70 text-sm mb-3">Um assistente digital faz o trabalho de 3,5 funcionários humanos.</p>
                <a href="#benefits" className="text-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver mais <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="glass p-6 rounded-lg transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl group">
                <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <MessageSquare className="text-gold w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Sem Parar</h3>
                <p className="text-foreground/70 text-sm mb-3">Atendimento instantâneo em qualquer horário, sem custos extras.</p>
                <a href="#benefits" className="text-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver mais <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="glass p-6 rounded-lg transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl group">
                <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Brain className="text-gold w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Conhecimento Total</h3>
                <p className="text-foreground/70 text-sm mb-3">Informações consistentes e atualizadas, sem esquecimentos.</p>
                <a href="#benefits" className="text-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver mais <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 text-foreground/80 hover:text-gold transition-colors"
              >
                Descubra todos os benefícios
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Section - Now using the updated component */}
        <Benefits />
        
        <PricingTable />
        <FinalCTA whatsappLink={whatsappLink} />
      </div>
    </div>
  );
};

export default AIAttendants;

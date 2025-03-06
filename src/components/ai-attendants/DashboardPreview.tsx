
import React from 'react';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, Monitor, Check, ChevronDown } from "lucide-react";

interface DashboardPreviewProps {
  scrollToSection: (sectionId: string) => void;
}

const DashboardPreview = ({ scrollToSection }: DashboardPreviewProps) => {
  return (
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
              className="bg-background text-foreground hover:text-black transition-colors"
            >
              Ver benefícios dos Funcionários Digitais
              <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;

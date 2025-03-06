
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronDown } from "lucide-react";

interface VideoDemoProps {
  scrollToSection: (sectionId: string) => void;
}

const VideoDemo = ({ scrollToSection }: VideoDemoProps) => {
  return (
    <section id="video-demo" className="py-20 bg-secondary/30 rounded-3xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-4">
            Veja em Ação
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Demonstração do <span className="text-gold">Funcionário Digital</span> no WhatsApp
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Assista como nossos Funcionários Digitais atendem seus clientes de forma natural e eficiente, 
            resolvendo dúvidas e realizando vendas automaticamente.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video rounded-xl bg-secondary/70 overflow-hidden relative glass border border-gold/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <MessageSquare className="h-16 w-16 text-gold/50 mx-auto mb-4" />
                <p className="text-xl font-medium text-foreground">Vídeo de Demonstração</p>
                <p className="text-foreground/70 mt-2">Assista ao vivo como o atendente interage com seus clientes</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-foreground/80 mb-4">Quer resultados como estes para seu negócio?</p>
            <Button 
              onClick={() => scrollToSection('pricing-table')}
              className="bg-gold hover:bg-gold-light text-black hover:text-black font-semibold"
            >
              Ver planos e preços
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;

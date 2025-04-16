
import React from "react";
import { Check } from "lucide-react";

const projectBenefits = [
  "Funis 100% automatizados, conectados com seu modelo de vendas",
  "Sistemas inteligentes que falam com leads, qualificam, agendam, vendem",
  "Layouts modernos, intuitivos e bonitos — do jeito que o seu cliente merece",
  "Implementação premium com onboarding guiado e sem complicação"
];

const ProjectsSection = () => {
  return (
    <section className="py-20 bg-background/60 relative z-10" id="projects">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gold/5 z-[-1]" />
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Nossos projetos entregam:
        </h2>
        
        <div className="max-w-5xl mx-auto glass p-8 rounded-2xl">
          <div className="grid gap-8">
            {projectBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gold/20 p-2 rounded-full">
                  <Check className="h-6 w-6 text-gold" />
                </div>
                <p className="text-xl">{benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="flex items-center glass p-6 rounded-xl animate-float">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/62342ed0-cfb6-48e6-9064-63e2c615ec81.png" 
                  alt="VR Automatize Logo" 
                  className="w-10 h-10"
                />
              </div>
              <div className="ml-4">
                <p className="text-xl font-medium">Soluções sob medida para o seu negócio</p>
                <p className="text-foreground/70">Desenvolvidas por especialistas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

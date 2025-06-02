
import React from "react";
import { Award } from "lucide-react";
import { PremiumSection } from "./PremiumComponents";
import MethodologyCard from "./authority/MethodologyCard";
import ExecutiveResourceCard from "./authority/ExecutiveResourceCard";
import RecognitionCard from "./authority/RecognitionCard";
import AuthorityCTA from "./authority/AuthorityCTA";
import { methodologiesData, executiveResourcesData, recognitionsData } from "./authority/authorityData";

const ExecutiveAuthoritySection = () => {
  return (
    <PremiumSection>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 premium-card-glass px-6 py-3 mb-6">
            <Award className="h-5 w-5 text-premium-gold" />
            <span className="executive-body-small font-semibold">Autoridade Executiva</span>
          </div>
          <h2 className="executive-display-large mb-6">
            <span className="text-white">Metodologias</span>
            <br />
            <span className="executive-accent">Proprietárias</span>
          </h2>
          <p className="executive-body-large max-w-4xl mx-auto">
            Frameworks desenvolvidos em parceria com as principais consultorias globais
          </p>
        </div>

        {/* Methodologies */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Frameworks Exclusivos</h3>
          
          <div className="space-y-8">
            {methodologiesData.map((methodology, index) => (
              <MethodologyCard 
                key={index} 
                methodology={methodology} 
                index={index} 
              />
            ))}
          </div>
        </div>

        {/* Executive Resources */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Recursos Executivos Exclusivos</h3>
          
          <div className="premium-grid-3 gap-8">
            {executiveResourcesData.map((resource, index) => (
              <ExecutiveResourceCard 
                key={index} 
                resource={resource} 
                index={index} 
              />
            ))}
          </div>
        </div>

        {/* Industry Recognition */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Reconhecimento da Indústria</h3>
          
          <div className="premium-grid-2 md:premium-grid-4 gap-6">
            {recognitionsData.map((recognition, index) => (
              <RecognitionCard 
                key={index} 
                recognition={recognition} 
                index={index} 
              />
            ))}
          </div>
        </div>

        {/* Authority CTA */}
        <AuthorityCTA />
      </div>
    </PremiumSection>
  );
};

export default ExecutiveAuthoritySection;

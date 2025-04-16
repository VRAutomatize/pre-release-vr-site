
import { lazy, Suspense } from "react";
import HeroTag from "./HeroTag";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroImage from "./HeroImage";

interface PageHeroProps {
  title: string;
  subtitle: string;
  tag?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const PageHero = ({ title, subtitle, tag, children }: PageHeroProps) => {
  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden mt-20 md:mt-12">
      {/* Background Effects - Removed first div, kept second with reduced size */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content Column */}
          <div className="w-full md:w-1/2 md:pr-8">
            {tag && (
              <div className="animate-fade-up" style={{ animationDuration: "0.5s" }}>
                <HeroTag>{tag}</HeroTag>
              </div>
            )}
            <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
              <HeroTitle>{title}</HeroTitle>
            </div>
            <div className="animate-fade-up" style={{ animationDuration: "0.9s" }}>
              <HeroDescription>{subtitle}</HeroDescription>
            </div>
            <div className="animate-fade-up" style={{ animationDuration: "1.1s" }}>
              {children}
            </div>
          </div>
          
          {/* Image Column - Matching Index page positioning */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
            <div className="animate-fade-up max-w-[80%]" style={{ animationDuration: "1.3s" }}>
              <HeroImage src="/lovable-uploads/77c90a03-2f82-4ecb-9e8c-95a95045fecb.png" alt="Mulher com roupa amarela" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;

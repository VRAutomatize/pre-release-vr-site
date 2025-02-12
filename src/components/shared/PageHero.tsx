
import { lazy, Suspense } from "react";
import HeroTag from "./HeroTag";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";

interface PageHeroProps {
  title: string;
  subtitle: string;
  tag?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const PageHero = ({ title, subtitle, tag, backgroundImage, children }: PageHeroProps) => {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden mt-16">
      {/* Background Image with lazy loading */}
      <Suspense fallback={<div className="absolute inset-0 z-0 bg-gray-800/20 animate-pulse" />}>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{
            backgroundImage: `url(${backgroundImage || 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=2000'})`,
            opacity: 0.1
          }}
        />
      </Suspense>

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
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
      </div>
    </section>
  );
};

export default PageHero;

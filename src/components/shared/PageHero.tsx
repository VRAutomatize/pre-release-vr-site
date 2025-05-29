
import { lazy, Suspense } from "react";
import HeroTag from "./HeroTag";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import OptimizedHeroImage from "./OptimizedHeroImage";

interface PageHeroProps {
  title: string;
  subtitle: string;
  tag?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const PageHero = ({ title, subtitle, tag, children }: PageHeroProps) => {
  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden mt-8 md:mt-4">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Content Column */}
          <div className="w-full lg:w-1/2 md:pr-8">
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
          
          {/* Image Column - Hidden on mobile, visible and right-aligned on desktop */}
          <div className="hidden lg:flex lg:justify-end lg:w-1/2 animate-fade-up" style={{ animationDuration: "1.3s" }}>
            <OptimizedHeroImage priority />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;

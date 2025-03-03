
import { lazy, Suspense, memo } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BackToTop from "@/components/BackToTop";

// Lazy load components that are not immediately visible
const ClientLogos = lazy(() => import("@/components/ClientLogos"));
const Services = lazy(() => import("@/components/Services"));
const Benefits = lazy(() => import("@/components/Benefits"));
const About = lazy(() => import("@/components/About"));
const ConsultationCard = lazy(() => import("@/components/ConsultationCard"));
const Footer = lazy(() => import("@/components/Footer"));

// Componente de loading otimizado com skeletons
const LoadingComponent = () => (
  <div className="w-full h-48 animate-pulse bg-secondary/20 rounded-lg" />
);

// Componentes de observabilidade para carregar quando visíveis
const LazyLoadSection = memo(({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <div id={id}>
      <Suspense fallback={<LoadingComponent />}>
        {children}
      </Suspense>
    </div>
  );
});

// Componente principal com memoização
const Index = memo(() => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <LazyLoadSection>
        <ClientLogos />
      </LazyLoadSection>
      
      <LazyLoadSection id="services">
        <Services />
      </LazyLoadSection>
      
      <LazyLoadSection id="benefits">
        <Benefits />
      </LazyLoadSection>
      
      <LazyLoadSection>
        <About />
      </LazyLoadSection>
      
      <LazyLoadSection id="contact">
        <ConsultationCard />
      </LazyLoadSection>
      
      <LazyLoadSection>
        <Footer />
      </LazyLoadSection>
      
      <BackToTop />
    </div>
  );
});

export default Index;

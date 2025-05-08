
import React, { lazy, Suspense, useCallback } from "react";
import { Home, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy loading components
const HeroSection = lazy(() => import("@/components/ai-attendants/HeroSection"));
const DashboardPreview = lazy(() => import("@/components/ai-attendants/DashboardPreview"));
const VideoDemo = lazy(() => import("@/components/ai-attendants/VideoDemo"));
const PricingTable = lazy(() => import("@/components/ai-attendants/PricingTable"));
const Benefits = lazy(() => import("@/components/benefits/Benefits"));
const FinalCTA = lazy(() => import("@/components/crm/FinalCTA"));

// Loading component
const SectionLoading = () => <Skeleton className="w-full h-64" />;

const AIAttendants = () => {
  const whatsappLink = "https://wa.me/554788558257?text=Ol%C3%A1!%20Tenho%20interesse%20em%20atendentes%20de%20IA!";

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
            className="bg-gold hover:bg-gold-light text-black hover:text-black font-medium rounded-md px-4 py-2 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Entre em contato
          </a>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-12 space-y-32">
        <Suspense fallback={<SectionLoading />}>
          <HeroSection scrollToSection={scrollToSection} />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <DashboardPreview scrollToSection={scrollToSection} />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <VideoDemo scrollToSection={scrollToSection} />
        </Suspense>

        <Suspense fallback={<SectionLoading />}>
          <Benefits />
        </Suspense>
        
        <section id="pricing-table">
          <Suspense fallback={<SectionLoading />}>
            <PricingTable />
          </Suspense>
        </section>
        
        <Suspense fallback={<SectionLoading />}>
          <FinalCTA whatsappLink={whatsappLink} />
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(AIAttendants);

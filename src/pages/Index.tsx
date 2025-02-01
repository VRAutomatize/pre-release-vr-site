import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BackToTop from "@/components/BackToTop";
import ConsultationCard from "@/components/ConsultationCard";

// Lazy load components that are not immediately visible
const ClientLogos = lazy(() => import("@/components/ClientLogos"));
const Services = lazy(() => import("@/components/Services"));
const Benefits = lazy(() => import("@/components/Benefits"));
const About = lazy(() => import("@/components/About"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading component
const LoadingComponent = () => (
  <div className="w-full h-48 animate-pulse bg-secondary/20 rounded-lg" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Suspense fallback={<LoadingComponent />}>
        <ClientLogos />
      </Suspense>
      <Suspense fallback={<LoadingComponent />}>
        <Services />
      </Suspense>
      <Suspense fallback={<LoadingComponent />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<LoadingComponent />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingComponent />}>
        <ConsultationCard />
      </Suspense>
      <Suspense fallback={<LoadingComponent />}>
        <Footer />
      </Suspense>
      <BackToTop />
    </div>
  );
};

export default Index;
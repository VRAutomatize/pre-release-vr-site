import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import About from "@/components/About";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ClientLogos />
      <Services />
      <Benefits />
      <About />
    </div>
  );
};

export default Index;
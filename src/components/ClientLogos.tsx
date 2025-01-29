import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const clients = [
  {
    name: "TechCorp",
    logo: "TC",
  },
  {
    name: "InnovaSys",
    logo: "IS",
  },
  {
    name: "DataFlow",
    logo: "DF",
  },
  {
    name: "SmartSolutions",
    logo: "SS",
  },
  {
    name: "NextLevel",
    logo: "NL",
  },
  {
    name: "FutureWare",
    logo: "FW",
  },
];

const ClientLogos = () => {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        playOnInit: true,
      }),
    []
  );

  return (
    <section className="relative -mt-12 z-10">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-foreground/60 mb-8">
          Empresas que confiam em nossas soluções
        </p>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            duration: 5000,
          }}
          plugins={[plugin]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {[...clients, ...clients].map((client, index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6"
              >
                <Card className="h-24 flex items-center justify-center glass hover:bg-white/10 transition-all duration-300">
                  <span className="text-2xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                    {client.logo}
                  </span>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ClientLogos;
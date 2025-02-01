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
    name: "VR Multimarcas",
    logo: "/lovable-uploads/40e74f65-6bfb-4872-9b4e-20b3bb1b44a8.png",
  },
  {
    name: "Globotos",
    logo: "/lovable-uploads/cb1da72f-6254-44a0-a8e5-175be333f1b5.png",
  },
  {
    name: "Nuvem",
    logo: "/lovable-uploads/b6305c8c-1f30-4ed1-80a3-283c326c0c03.png",
  },
  {
    name: "Prime Tech",
    logo: "/lovable-uploads/d21c0b17-1fc9-4e61-a5e8-b9f25cea7124.png",
  },
  {
    name: "7Mind",
    logo: "/lovable-uploads/4782448f-c0f8-45ef-94bb-b532605dbf0c.png",
  },
  {
    name: "Drogaria",
    logo: "/lovable-uploads/dbd4e914-8406-4641-8267-8dcea083b457.png",
  },
  {
    name: "Eagle",
    logo: "/lovable-uploads/7b6ccce4-3275-4d35-852a-d287b4bd93ae.png",
  },
  {
    name: "Sorriso",
    logo: "/lovable-uploads/2fc94956-abdf-41f6-9b2b-b275cbc2b040.png",
  },
  {
    name: "Dental",
    logo: "/lovable-uploads/f5a068e5-2fc5-4f76-b90e-238dce141186.png",
  },
  {
    name: "Maxxi",
    logo: "/lovable-uploads/1fd9a803-9380-4d5f-a3be-7b8afd6732d4.png",
  },
  {
    name: "Time Fitness",
    logo: "/lovable-uploads/77c90a03-2f82-4ecb-9e8c-95a95045fecb.png",
  },
  {
    name: "Vr",
    logo: "/lovable-uploads/77a1a506-c12b-485f-aaa3-317e2f93a235.png",
  },
  {
    name: "VR2",
    logo: "/lovable-uploads/25207d57-c242-41e3-bcdb-1481964713be.png",
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
    <section className="relative mt-24 z-10">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-foreground/60 mb-8">
          Empresas que confiam em nossas soluções
        </p>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            duration: 14000,
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
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="h-12 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity duration-300"
                  />
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
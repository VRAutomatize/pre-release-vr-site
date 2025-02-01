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
    logo: "/lovable-uploads/917b284e-a8c9-4341-88ed-aad8e05ea13f.png",
  },
  {
    name: "Gl Motos",
    logo: "/lovable-uploads/155b5125-5155-4da8-8e69-a926bb0e725a.png",
  },
  {
    name: "Nuvem",
    logo: "/lovable-uploads/74f8528e-8527-43d3-9445-95f3e89e584b.png",
  },
  {
    name: "Prime Tech",
    logo: "/lovable-uploads/29099947-c41c-4578-b48a-f7953524812f.png",
  },
  {
    name: "7Mind",
    logo: "/lovable-uploads/0a35b485-72e1-4f3f-8900-d41646124b0a.png",
  },
  {
    name: "Xtreme",
    logo: "/lovable-uploads/c398dcc6-b53f-4b91-a7c8-29c891c57c83.png",
  },
  {
    name: "Eagle",
    logo: "/lovable-uploads/50af406d-26a7-4c58-81d6-756f081640d0.png",
  },
  {
    name: "Sofit",
    logo: "/lovable-uploads/cabfb3dc-3a9e-4531-8757-4e1b2dc7363d.png",
  },
  {
    name: "Moto Mais",
    logo: "/lovable-uploads/884d326c-90e4-41aa-8f58-e134ad493366.png",
  },
  {
    name: "Tim Empresas",
    logo: "/lovable-uploads/5d35446c-f47f-4ff2-9afb-de75f5801622.png",
  },
  {
    name: "Vr",
    logo: "/lovable-uploads/852fa164-d053-49b9-a2a4-4db672b3282e.png",
  },
  {
    name: "Infinity",
    logo: "/lovable-uploads/dbb91824-7060-4ff2-8df5-3afaa552c17a.png",
  },
  {
    name: "XO",
    logo: "/lovable-uploads/36e5a340-bb98-464e-aa98-e13fc3cb1eb9.png",
  },
  {
    name: "Inow",
    logo: "/lovable-uploads/49dc917a-a646-491f-b6e6-988a72c0aef7.png",
  },
  {
    name: "VR Tech",
    logo: "/lovable-uploads/7d9928ed-528b-4eb7-a24c-dc127fbf0b64.png",
  },
];

const ClientLogos = () => {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
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
                <Card className="h-24 flex items-center justify-center glass hover:bg-white/10 transition-all duration-300 p-4">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
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
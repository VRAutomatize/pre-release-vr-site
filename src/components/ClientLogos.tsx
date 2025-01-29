import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

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
  return (
    <section className="py-12 bg-secondary/50">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-foreground/60 mb-8">
          Empresas que confiam em nossas soluções
        </p>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {clients.map((client, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="h-24 flex items-center justify-center floating-card">
                  <span className="text-2xl font-bold text-gold/80">
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
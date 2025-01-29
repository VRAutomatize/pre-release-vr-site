import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

const ClientLogos = () => {
  const autoplayOptions = {
    delay: 5000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      duration: 5000,
    },
    [AutoPlay(autoplayOptions)]
  );

  const logos = [
    {
      src: "/lovable-uploads/62342ed0-cfb6-48e6-9064-63e2c615ec81.png",
      alt: "Logo 1",
    },
    {
      src: "/lovable-uploads/8e420cb7-340c-4931-ba8e-dc5b9575e88e.png",
      alt: "Logo 2",
    },
    {
      src: "/placeholder.svg",
      alt: "Logo 3",
    },
    {
      src: "/placeholder.svg",
      alt: "Logo 4",
    },
    {
      src: "/placeholder.svg",
      alt: "Logo 5",
    },
  ];

  const renderLogos = () => {
    return logos.map((logo, index) => (
      <div key={index} className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/5 px-4">
        <img
          src={logo.src}
          alt={logo.alt}
          className="w-full h-12 object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
        />
      </div>
    ));
  };

  return (
    <section className="relative mt-24 z-10">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gold/60 mb-8 uppercase tracking-wider font-medium">
          Empresas que confiam em nossas soluções
        </p>
        <div className="glass rounded-xl p-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">{renderLogos()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
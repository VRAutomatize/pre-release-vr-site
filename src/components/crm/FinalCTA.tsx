import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface FinalCTAProps {
  whatsappLink: string;
}

const FinalCTA = ({ whatsappLink }: FinalCTAProps) => {
  return (
    <section className="relative z-10 text-center pb-32">
      <div className="glass p-12 rounded-2xl animate-fade-up">
        <h2 className="text-3xl font-bold mb-4">Pronto para Transformar seu Negócio?</h2>
        <p className="text-xl text-foreground/80 mb-8">
          Fale com nosso time comercial e descubra como podemos ajudar sua empresa a crescer
        </p>
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-lg px-8 py-6"
        >
          <MessageSquare className="mr-2" />
          Falar com Time Comercial
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
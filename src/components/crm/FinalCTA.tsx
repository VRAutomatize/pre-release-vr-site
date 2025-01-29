import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative z-10 text-center pb-32">
      <div className="glass p-12 rounded-2xl animate-fade-up">
        <h2 className="text-3xl font-bold mb-4">Pronto para Transformar seu Negócio?</h2>
        <p className="text-xl text-foreground/80 mb-8">
          Fale com nosso time comercial e descubra como podemos ajudar sua empresa a crescer
        </p>
        <Button className="bg-gold hover:bg-gold-light text-background text-lg px-8 py-6">
          <MessageSquare className="mr-2" />
          Falar com Time Comercial
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
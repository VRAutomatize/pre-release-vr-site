import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ConsultationCard = () => {
  const { toast } = useToast();

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass p-8 md:p-12 rounded-2xl relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Reunião de Assessoria{" "}
              <span className="text-gold">Gratuita</span>
            </h2>

            <div className="flex items-center justify-center gap-2 text-gold mb-8">
              <Clock className="w-5 h-5" />
              <span className="text-lg">~45 minutos</span>
            </div>

            <p className="text-lg text-center text-foreground/90 mb-8 max-w-2xl mx-auto">
              Nossos profissionais vão analisar a sua operação e encontrar melhorias 
              para aumentar seu faturamento através da automação inteligente.
            </p>

            <div className="flex justify-center">
              <Button 
                className="bg-gold hover:bg-gold-light text-background px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  window.open('https://wa.me/554788558257?text=Olá!%20Tenho%20interesse%20na%20Assessoria%20Gratuita%20de%20vocês!', '_blank');
                  toast({
                    title: "Redirecionando para WhatsApp",
                    description: "Você será redirecionado para iniciar uma conversa no WhatsApp",
                    duration: 3000,
                  });
                }}
              >
                Assessoria Gratuita
                <ArrowRight className="ml-2 animate-pulse" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCard;
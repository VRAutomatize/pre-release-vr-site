
import React from "react";
import { MessageCircle } from "lucide-react";

const testimonials = [
  {
    quote: "Depois da automação, reduzi 2 cargos da operação e tripliquei a velocidade de resposta aos meus leads.",
    author: "João",
    role: "dono de e-commerce"
  },
  {
    quote: "Meu funil de venda agora roda sem mim. O cliente chega, recebe tudo, agenda e paga. E eu só recebo o PIX.",
    author: "Laura",
    role: "mentora digital"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 relative z-10" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Resultados reais, performance sem oscilação
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass p-8 rounded-2xl relative animate-fade-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute -top-4 -left-4 bg-gold/20 p-2 rounded-full">
                <MessageCircle className="h-6 w-6 text-gold" />
              </div>
              <p className="text-xl mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center">
                  {testimonial.author[0]}
                </div>
                <div className="ml-4">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-foreground/70">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

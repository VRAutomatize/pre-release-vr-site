
import BenefitItem from "./BenefitItem";
import BenefitsChart from "./BenefitsChart";
import { benefitsData } from "./BenefitsData";

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6">
            Transforme Seus Resultados
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Problemas que os <span className="text-gold">Funcionários Digitais</span> Eliminam
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Descubra como nossas soluções resolvem as principais dores do seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-20">
          {benefitsData.map((benefit, index) => (
            <BenefitItem 
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              problem={benefit.problem}
              solution={benefit.solution}
              index={index}
            />
          ))}
        </div>

        <div className="glass rounded-xl p-8 mt-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-40"></div>
          
          <h3 className="text-2xl font-bold mb-6 text-center relative z-10">Impacto Mensurável nos Resultados</h3>
          <p className="text-center mb-10 max-w-2xl mx-auto text-foreground/80 relative z-10">
            Veja a diferença real que nossos funcionários digitais fazem nos indicadores mais importantes do seu negócio.
          </p>
          
          <BenefitsChart />
          
          <div className="flex justify-center mt-12">
            <a 
              href="https://wa.me/554788558257?text=Ol%C3%A1!%20Tenho%20interesse%20em%20atendentes%20de%20IA!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold/90 text-black hover:text-black font-semibold h-12 px-8"
            >
              Quero Estes Resultados!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;

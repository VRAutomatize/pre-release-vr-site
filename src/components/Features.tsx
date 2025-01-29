import { Gauge, Users, BarChart3, Zap } from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Automação Inteligente",
    description:
      "Otimize seus processos com automação avançada e fluxos de trabalho personalizados.",
  },
  {
    icon: Users,
    title: "Gestão de Relacionamentos",
    description:
      "Centralize todos os dados dos seus clientes em uma única plataforma integrada.",
  },
  {
    icon: BarChart3,
    title: "Análise de Dados",
    description:
      "Tome decisões baseadas em dados com relatórios e dashboards em tempo real.",
  },
  {
    icon: Zap,
    title: "Integração Rápida",
    description:
      "Implementação ágil e suporte contínuo para maximizar seus resultados.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6">
            Recursos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transforme sua gestão de relacionamentos
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Nossa plataforma oferece todas as ferramentas necessárias para
            otimizar seus processos e melhorar o relacionamento com seus clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="floating-card rounded-xl p-6"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <feature.icon className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
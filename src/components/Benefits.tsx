
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { Clock, DollarSign, Users, Brain, Shield, BarChart2 } from "lucide-react";

// Updated data with more impactful metrics
const data = [
  {
    name: 'Redução de Custos',
    antes: 100,
    depois: 27,
    label: '-73%'
  },
  {
    name: 'Tempo de Resposta',
    antes: 100,
    depois: 5,
    label: '-95%'
  },
  {
    name: 'Satisfação do Cliente',
    antes: 60,
    depois: 92,
    label: '+53%'
  },
  {
    name: 'Taxa de Conversão',
    antes: 100,
    depois: 185,
    label: '+85%'
  },
];

// Updated benefits with clear pain points addressed
const benefits = [
  {
    icon: DollarSign,
    title: "Redução de Custos Operacionais",
    problem: "Folha de pagamento consome seu orçamento?",
    solution: "Economize até 73% em custos operacionais eliminando salários, encargos, benefícios e toda a burocracia trabalhista.",
  },
  {
    icon: Clock,
    title: "Atendimento Instantâneo 24/7",
    problem: "Perde vendas fora do horário comercial?",
    solution: "Seus clientes recebem respostas em segundos, qualquer hora do dia ou da noite, sem custos extras de plantão ou horas extras.",
  },
  {
    icon: Users,
    title: "Escalabilidade Sem Limites",
    problem: "Não consegue crescer por falta de pessoal qualificado?",
    solution: "Multiplique sua capacidade de atendimento instantaneamente durante picos de demanda sem processos seletivos ou treinamentos.",
  },
  {
    icon: Shield,
    title: "Conhecimento Consistente",
    problem: "Informações desencontradas prejudicam sua marca?",
    solution: "Elimine respostas inconsistentes com uma base de conhecimento unificada que nunca esquece detalhes importantes.",
  },
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className="floating-card p-6 relative overflow-hidden group hover:border-gold/40 transition-all duration-300"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-gold/5 rounded-full transition-all duration-500 group-hover:bg-gold/10 group-hover:scale-110"></div>
              <benefit.icon className="w-12 h-12 text-gold mb-4 relative z-10" />
              <h3 className="text-xl font-semibold mb-2 relative z-10">{benefit.title}</h3>
              <p className="text-gold/90 font-medium mb-2 text-sm relative z-10">{benefit.problem}</p>
              <p className="text-foreground/80 relative z-10">{benefit.solution}</p>
            </Card>
          ))}
        </div>

        <div className="glass rounded-xl p-8 mt-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-40"></div>
          
          <h3 className="text-2xl font-bold mb-6 text-center relative z-10">Impacto Mensurável nos Resultados</h3>
          <p className="text-center mb-10 max-w-2xl mx-auto text-foreground/80 relative z-10">
            Veja a diferença real que nossos funcionários digitais fazem nos indicadores mais importantes do seu negócio.
          </p>
          
          <div className="h-[500px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 30,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff80" 
                  tick={{ fill: '#ffffff' }}
                  tickLine={{ stroke: '#ffffff40' }}
                  axisLine={{ stroke: '#ffffff40' }}
                />
                <YAxis 
                  stroke="#ffffff80" 
                  tick={{ fill: '#ffffff' }}
                  tickLine={{ stroke: '#ffffff40' }}
                  axisLine={{ stroke: '#ffffff40' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e1b2e',
                    border: '1px solid rgba(255,215,0,0.3)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                  }}
                  cursor={{ fill: 'rgba(255,215,0,0.05)' }}
                  formatter={(value) => [`${value}%`, '']}
                />
                <Bar 
                  name="Antes da Automação" 
                  dataKey="antes" 
                  fill="#4a4658" 
                  radius={[4, 4, 0, 0]}
                  barSize={50}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
                <Bar 
                  name="Depois da Automação" 
                  dataKey="depois" 
                  fill="#FFD700" 
                  radius={[4, 4, 0, 0]}
                  barSize={50}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationBegin={300}
                >
                  <LabelList 
                    dataKey="label" 
                    position="top" 
                    fill="#FFD700" 
                    fontSize={16} 
                    fontWeight="bold"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center mt-12">
            <a 
              href="https://wa.me/554788558257?text=Ol%C3%A1!%20Tenho%20interesse%20em%20atendentes%20de%20IA!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold/90 text-background h-12 px-8"
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

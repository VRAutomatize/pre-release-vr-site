import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Heart, TrendingUp } from "lucide-react";

const data = [
  {
    name: 'Tempo de Atendimento',
    antes: 100,
    depois: 20,
  },
  {
    name: 'Fidelização',
    antes: 40,
    depois: 85,
  },
  {
    name: 'Faturamento',
    antes: 100,
    depois: 180,
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Tempo de Atendimento",
    description: "Reduza drasticamente o tempo de resposta com atendimento automatizado 24/7, garantindo satisfação instantânea do cliente.",
  },
  {
    icon: Heart,
    title: "Fidelização de Clientes",
    description: "Aumente a percepção positiva da sua marca com respostas consistentes e personalizadas, fortalecendo o relacionamento com clientes.",
  },
  {
    icon: TrendingUp,
    title: "Aumento no Faturamento",
    description: "Potencialize suas vendas através de processos otimizados e atendimento escalável, convertendo mais leads em clientes.",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6">
            Benefícios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transforme sua Empresa com Automação
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Descubra como nossas soluções de automação podem revolucionar seus resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className="floating-card p-6"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <benefit.icon className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-foreground/80">{benefit.description}</p>
            </Card>
          ))}
        </div>

        <div className="glass rounded-xl p-8 mt-12">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e1b2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Bar 
                  name="Antes da Automação" 
                  dataKey="antes" 
                  fill="#4a4658" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  name="Depois da Automação" 
                  dataKey="depois" 
                  fill="#FFD700" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
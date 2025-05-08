import React from "react";
import { ArrowLeft, ArrowRight, Clock, Database, DollarSign, LineChart, Zap, Users, CheckCircle, AlertTriangle, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import PageHero from "@/components/shared/PageHero";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

const DigitalEmployees = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Animation variants for staggered elements
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15
      }
    }
  };
  const calendarLink = "https://www.cal.com/vrautomatize";
  
  return <div className="min-h-screen bg-background">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <a href={calendarLink} target="_blank" rel="noopener noreferrer" className="bg-gold hover:bg-gold-light text-background rounded-lg px-4 py-2 flex items-center gap-2">
            <Clock className="h-4 w-4 mr-2" />
            Agendar Consulta
          </a>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-24 space-y-32">
        {/* --- Hero Section Start --- */}
        <PageHero title="Funcionários Digitais" subtitle="Reduza em até 6 dígitos seus custos fixos. Sistemas que trabalham 24/7 — sem pausas ou oscilações, substituindo processos operacionais." tag="A Automação Definitiva">
          {/* Additional content passed as children to PageHero */}
          <div className="space-y-6 mt-6">
            <p className="text-xl font-semibold text-gold animate-fade-up" style={{
            animationDelay: "0.6s"
          }}>
              Mais produtividade. Menos custo fixo. Performance constante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-up" style={{
            animationDelay: "0.8s"
          }}>
              <a href={calendarLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-lg px-4 sm:px-8 py-3 sm:py-4">
                <Calculator className="mr-2 h-5 w-5 flex-shrink-0" /> 
                <span className="text-sm sm:text-lg">
                  {isMobile ? "Calcule sua economia" : "Cálculo estimado da sua economia anual com automação"}
                </span>
                <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
              </a>
            </div>
          </div>
        </PageHero>
        {/* --- Hero Section End --- */}

        {/* Ideal For Section - Rounded corners added */}
        <section className="relative">
          <motion.div className="max-w-4xl mx-auto text-center mb-16" initial="hidden" whileInView="show" viewport={{
          once: true,
          amount: 0.3
        }} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
              Essa solução é ideal para negócios que:
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <motion.div variants={itemVariants} className="floating-card p-6 flex items-start gap-4 hover:border-gold/40 transition-all duration-300 rounded-lg">
                <CheckCircle className="h-8 w-8 text-gold shrink-0" />
                <p className="text-xl text-left">Querem reduzir o custo fixo mensal sem perder produtividade.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="floating-card p-6 flex items-start gap-4 hover:border-gold/40 transition-all duration-300 rounded-lg">
                <CheckCircle className="h-8 w-8 text-gold shrink-0" />
                <p className="text-xl text-left">Precisam escalar vendas, atendimento e processos com previsibilidade</p>
              </motion.div>

              <motion.div variants={itemVariants} className="floating-card p-6 flex items-start gap-4 hover:border-gold/40 transition-all duration-300 rounded-lg">
                <CheckCircle className="h-8 w-8 text-gold shrink-0" />
                <p className="text-xl text-left">Estão gastando demais com tarefas que podem ser automatizadas</p>
              </motion.div>

              <motion.div variants={itemVariants} className="floating-card p-6 flex items-start gap-4 hover:border-gold/40 transition-all duration-300 rounded-lg">
                <CheckCircle className="h-8 w-8 text-gold shrink-0" />
                <p className="text-xl text-left">Buscam padronização, eficiência e controle total da operação</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Comparison Section - Rounded corners added, contrast fixed */}
        <section className="relative py-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-40 right-20 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{
            animationDelay: "1s"
          }} />
          </div>
          
          <motion.div className="max-w-6xl mx-auto" initial="hidden" whileInView="show" viewport={{
          once: true,
          amount: 0.3
        }} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-16 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">Comparativo real:</span> Humanos vs Funcionários Digitais
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Human Employee - Rounded corners */}
              <motion.div variants={itemVariants} className="floating-card p-8 rounded-lg relative overflow-hidden border-red-400/20">
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/5 rounded-full"></div>
                <Users className="w-16 h-16 text-red-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-6">Funcionário convencional:</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <DollarSign className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                    <p className="text-lg">Custo fixo mensal: <span className="font-semibold text-red-400">R$2.500+</span></p>
                  </div>

                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                    <p className="text-lg">Ausência, erro humano, limitação de horário</p>
                  </div>

                  <div className="flex items-start gap-4">
                    <LineChart className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                    <p className="text-lg">Baixa escalabilidade</p>
                  </div>
                </div>
              </motion.div>

              {/* Digital Employee - Rounded corners */}
              <motion.div variants={itemVariants} className="floating-card p-8 rounded-lg relative overflow-hidden border-gold/20">
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold/5 rounded-full"></div>
                <Zap className="w-16 h-16 text-gold mb-6" />
                <h3 className="text-2xl font-semibold mb-6">Funcionário Digital:</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <DollarSign className="w-6 h-6 text-gold shrink-0 mt-1" />
                    <p className="text-lg">Custo único de implementação</p>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-gold shrink-0 mt-1" />
                    <p className="text-lg">Trabalha 24h/dia, sem erro ou pausa</p>
                  </div>

                  <div className="flex items-start gap-4">
                    <LineChart className="w-6 h-6 text-gold shrink-0 mt-1" />
                    <p className="text-lg">Escala ilimitada, sem dor de cabeça</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p variants={itemVariants} className="text-xl text-center mt-12 font-semibold text-gold">
              Em 12 meses, a economia pode passar dos R$100.000* — e o retorno ser múltiplas vezes maior.
            </motion.p>
          </motion.div>
        </section>

        {/* How It Works Section - Rounded corners */}
        <section className="relative">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="show" viewport={{
          once: true,
          amount: 0.3
        }} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
              Como funciona nosso processo:
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[{
              title: "Mapeamos os pontos ineficientes da sua operação",
              icon: Database,
              delay: 0
            }, {
              title: "Criamos um sistema automatizado sob medida",
              icon: Zap,
              delay: 0.2
            }, {
              title: "Substituímos o trabalho manual por uma máquina de performance constante",
              icon: Users,
              delay: 0.4
            }, {
              title: "Tudo isso com design moderno, onboarding guiado e zero fricção pra sua equipe",
              icon: CheckCircle,
              delay: 0.6
            }].map((step, index) => <motion.div key={index} variants={itemVariants} className="floating-card p-6 flex flex-col items-center text-center hover:border-gold/40 transition-all duration-300 relative h-full rounded-lg">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                    <step.icon className="h-6 w-6 text-gold" />
                  </div>
                  <span className="text-gold font-bold text-5xl absolute -top-10 -left-2 opacity-20">0{index + 1}</span>
                  <p className="text-lg">{step.title}</p>
                </motion.div>)}
            </div>
          </motion.div>
        </section>

        {/* Use Cases Section - Rounded corners */}
        <section className="relative">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="show" viewport={{
          once: true,
          amount: 0.3
        }} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-16 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">Quem está usando</span> Funcionários Digitais:
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[{
              title: "Mentores e infoprodutores",
              description: "automação de vendas, onboarding e suporte",
              icon: Users
            }, {
              title: "E-commerces",
              description: "automação de atendimento, carrinho e funil de recuperação",
              icon: Database
            }, {
              title: "Empresas de financiamento",
              description: "qualificação automática via CPF + agendamento de coldcall",
              icon: DollarSign
            }, {
              title: "Negócios locais e serviços 1x1",
              description: "propostas, agendamento, follow-ups automatizados",
              icon: Clock
            }].map((useCase, index) => <motion.div key={index} variants={itemVariants} className="floating-card p-8 flex items-start gap-6 hover:border-gold/40 transition-all duration-300 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <useCase.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-foreground/70">{useCase.description}</p>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>
        </section>

        {/* CTA Section - Rounded corners */}
        <section className="relative py-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gold/10 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl animate-float" style={{
            animationDelay: "2s"
          }} />
          </div>

          <Card className="max-w-5xl mx-auto border-gold/30 relative overflow-hidden bg-black/30 backdrop-blur-lg rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
            <div className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
                    Vamos analisar sua operação gratuitamente.
                  </h2>
                  <p className="text-lg mb-8">
                    Receba um diagnóstico completo com:
                  </p>
                  <ul className="space-y-4 mb-8">
                    {["Cálculo estimado da sua economia anual com automação", "Sugestão de processos para automatizar", "Roadmap de implementação"].map((item, i) => <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-gold shrink-0" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                  <div className="mt-8 hidden md:block">
                    <a href={calendarLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-lg px-4 sm:px-8 py-3 sm:py-4">
                      <Calculator className="mr-2 h-5 w-5 flex-shrink-0" /> 
                      <span className="text-sm sm:text-lg">
                        {isMobile ? "Calcule sua economia" : "Cálculo estimado da sua economia anual com automação"}
                      </span>
                      <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
                    </a>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <img src="/lovable-uploads/69d6e3a4-5346-41f7-988f-8151c83e758c.png" alt="VR Automatize Logo" className="w-48 h-48 object-contain animate-pulse-slow" />
                </div>
              </div>
              <div className="mt-8 md:hidden">
                <a href={calendarLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-lg px-4 py-3 w-full">
                  <Calculator className="mr-2 h-5 w-5 flex-shrink-0" /> 
                  <span className="text-sm">Calcule sua economia</span>
                  <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
                </a>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>;
};
export default DigitalEmployees;

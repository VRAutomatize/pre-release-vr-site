
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

interface StorySection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  icon: React.ElementType;
  stats: {
    value: string;
    label: string;
  };
  bgGradient: string;
}

const storySections: StorySection[] = [
  {
    id: "problem",
    title: "O Desafio",
    subtitle: "Custos Crescentes",
    content: "Empresários enfrentam custos operacionais que consomem até 70% da receita, limitando crescimento e rentabilidade.",
    icon: TrendingUp,
    stats: { value: "70%", label: "dos custos em operação" },
    bgGradient: "from-red-500/20 to-orange-500/20"
  },
  {
    id: "solution",
    title: "A Solução",
    subtitle: "Automação Inteligente",
    content: "Funcionários Digitais executam tarefas operacionais 24/7, reduzindo custos e aumentando eficiência drasticamente.",
    icon: Users,
    stats: { value: "24/7", label: "operação contínua" },
    bgGradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "results",
    title: "Os Resultados",
    subtitle: "Economia Comprovada",
    content: "Clientes economizam em média R$ 283k por ano, com ROI superior a 400% no primeiro ano de implementação.",
    icon: DollarSign,
    stats: { value: "R$ 283k", label: "economia média anual" },
    bgGradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: "action",
    title: "Sua Oportunidade",
    subtitle: "Transforme Hoje",
    content: "Junte-se às 200+ empresas que já transformaram seus custos. Agende uma análise gratuita e descubra seu potencial.",
    icon: Target,
    stats: { value: "200+", label: "empresas transformadas" },
    bgGradient: "from-gold/20 to-yellow-500/20"
  }
];

const StorytellingScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0.3]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      const sectionIndex = Math.floor(value * storySections.length);
      setActiveSection(Math.min(sectionIndex, storySections.length - 1));
    });

    return unsubscribe;
  }, [smoothProgress]);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] md:hidden">
      {/* Background Elements */}
      <motion.div
        style={{ y: backgroundY, opacity }}
        className="fixed inset-0 premium-gradient-bg"
      />
      
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 premium-glass rounded-full animate-parallax-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.2}s`
            }}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-30 h-1">
        <motion.div
          className="h-full premium-gold-gradient"
          style={{ scaleX: smoothProgress, originX: 0 }}
        />
      </div>

      {/* Story Sections */}
      <div className="relative z-10">
        {storySections.map((section, index) => {
          const sectionProgress = useTransform(
            smoothProgress,
            [index / storySections.length, (index + 1) / storySections.length],
            [0, 1]
          );

          const y = useTransform(sectionProgress, [0, 1], [100, -100]);
          const scale = useTransform(sectionProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
          const sectionOpacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

          return (
            <motion.div
              key={section.id}
              style={{ y, scale, opacity: sectionOpacity }}
              className="story-section sticky top-0"
            >
              <div className="container-premium">
                <motion.div
                  className={`card-premium bg-gradient-to-br ${section.bgGradient} relative overflow-hidden`}
                  whileInView={{ rotateY: [5, 0], rotateX: [5, 0] }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent transform rotate-12 scale-150" />
                  </div>

                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 premium-glass rounded-2xl mb-6 animate-float-premium"
                      whileInView={{ scale: [0, 1], rotate: [0, 360] }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      <section.icon className="h-8 w-8 text-gold" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold text-gold premium-text-glow mb-2">
                        {section.title}
                      </h2>
                      <h3 className="text-lg font-semibold text-foreground/80 mb-4">
                        {section.subtitle}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed mb-6 text-base">
                        {section.content}
                      </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                      className="premium-glass rounded-xl p-4 inline-block animate-glow-pulse"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="text-2xl font-bold text-gold mb-1">
                        {section.stats.value}
                      </div>
                      <div className="text-sm text-foreground/60">
                        {section.stats.label}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Section Navigation Dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-3">
          {storySections.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === index 
                  ? 'bg-gold shadow-lg shadow-gold/50' 
                  : 'bg-foreground/30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorytellingScroll;


import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Target, Award, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEnhancedConversionAnalytics } from "@/hooks/useEnhancedConversionAnalytics";

interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    value: number;
    description: string;
  }[];
}

interface AssessmentResult {
  score: number;
  level: 'basic' | 'intermediate' | 'advanced' | 'executive';
  title: string;
  description: string;
  recommendations: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const questions: Question[] = [
  {
    id: 'revenue',
    question: 'Qual o faturamento mensal da sua empresa?',
    options: [
      { text: 'Até R$ 100k', value: 1, description: 'Pequeno porte' },
      { text: 'R$ 100k - R$ 500k', value: 2, description: 'Médio porte' },
      { text: 'R$ 500k - R$ 2M', value: 3, description: 'Grande porte' },
      { text: 'Acima de R$ 2M', value: 4, description: 'Corporativo' }
    ]
  },
  {
    id: 'processes',
    question: 'Quantos processos repetitivos sua empresa possui?',
    options: [
      { text: '1-3 processos', value: 1, description: 'Poucos processos' },
      { text: '4-8 processos', value: 2, description: 'Processos moderados' },
      { text: '9-15 processos', value: 3, description: 'Muitos processos' },
      { text: '15+ processos', value: 4, description: 'Alta complexidade' }
    ]
  },
  {
    id: 'team_size',
    question: 'Quantos funcionários operacionais você possui?',
    options: [
      { text: '1-5 funcionários', value: 1, description: 'Time pequeno' },
      { text: '6-15 funcionários', value: 2, description: 'Time médio' },
      { text: '16-30 funcionários', value: 3, description: 'Time grande' },
      { text: '30+ funcionários', value: 4, description: 'Time corporativo' }
    ]
  },
  {
    id: 'pain_level',
    question: 'Qual o nível de dor com custos operacionais?',
    options: [
      { text: 'Baixo - Manageable', value: 1, description: 'Sob controle' },
      { text: 'Médio - Preocupante', value: 2, description: 'Precisa atenção' },
      { text: 'Alto - Problemático', value: 3, description: 'Muito problemático' },
      { text: 'Crítico - Insustentável', value: 4, description: 'Urgente' }
    ]
  },
  {
    id: 'urgency',
    question: 'Qual a urgência para implementar automação?',
    options: [
      { text: 'Futuro - 6+ meses', value: 1, description: 'Planejamento' },
      { text: 'Breve - 3-6 meses', value: 2, description: 'Em análise' },
      { text: 'Imediato - 1-3 meses', value: 3, description: 'Prioridade alta' },
      { text: 'Emergencial - Agora', value: 4, description: 'Crítico' }
    ]
  }
];

const ExecutiveAssessment = () => {
  const { trackEvent } = useEnhancedConversionAnalytics();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    trackEvent('assessment_question_answered', 'answer', `question_${questionId}`, 'interactive', {
      questionId,
      value,
      questionNumber: currentQuestion + 1
    });

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    const totalScore = Object.values(finalAnswers).reduce((sum, value) => sum + value, 0);
    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    let assessmentResult: AssessmentResult;

    if (percentage >= 80) {
      assessmentResult = {
        score: percentage,
        level: 'executive',
        title: 'Cliente VIP - Perfil Executivo',
        description: 'Empresa de alto faturamento com necessidade crítica de automação. Potencial de economia superior a R$ 500k/ano.',
        recommendations: [
          'Consultoria executiva personalizada',
          'Implementação acelerada em 30 dias',
          'Suporte premium 24/7',
          'ROI garantido em 90 dias'
        ],
        priority: 'critical'
      };
    } else if (percentage >= 60) {
      assessmentResult = {
        score: percentage,
        level: 'advanced',
        title: 'Cliente Premium - Alto Potencial',
        description: 'Empresa consolidada com excelente potencial de automação. Economia estimada entre R$ 200k-500k/ano.',
        recommendations: [
          'Consultoria estratégica completa',
          'Implementação em 45-60 dias',
          'Suporte especializado',
          'Acompanhamento de resultados'
        ],
        priority: 'high'
      };
    } else if (percentage >= 40) {
      assessmentResult = {
        score: percentage,
        level: 'intermediate',
        title: 'Cliente Qualificado - Bom Fit',
        description: 'Empresa em crescimento com oportunidades claras de automação. Economia estimada entre R$ 50k-200k/ano.',
        recommendations: [
          'Consultoria focada em processos-chave',
          'Implementação gradual em 60-90 dias',
          'Suporte durante implementação',
          'Métricas de acompanhamento'
        ],
        priority: 'medium'
      };
    } else {
      assessmentResult = {
        score: percentage,
        level: 'basic',
        title: 'Oportunidade de Crescimento',
        description: 'Empresa com potencial inicial para automação. Recomendamos começar com processos simples.',
        recommendations: [
          'Consultoria inicial gratuita',
          'Implementação piloto em 90 dias',
          'Suporte básico',
          'Crescimento gradual'
        ],
        priority: 'low'
      };
    }

    setResult(assessmentResult);
    setShowResults(true);

    trackEvent('assessment_completed', 'complete', 'executive_assessment', 'interactive', {
      totalScore,
      percentage,
      level: assessmentResult.level,
      priority: assessmentResult.priority
    });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && result) {
    return (
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="p-8 bg-gradient-to-br from-background to-gold/5 border-gold/20">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="h-8 w-8 text-gold" />
                  <h2 className="text-3xl font-bold text-gold">{result.title}</h2>
                </div>

                {/* Score */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-gold mb-2">
                    {result.score.toFixed(0)}%
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-lg px-4 py-2 ${
                      result.priority === 'critical' ? 'border-red-500 text-red-400' :
                      result.priority === 'high' ? 'border-gold text-gold' :
                      result.priority === 'medium' ? 'border-blue-400 text-blue-400' :
                      'border-green-400 text-green-400'
                    }`}
                  >
                    {result.level.toUpperCase()}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {result.description}
                </p>

                {/* Recommendations */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gold">Recomendações Personalizadas:</h3>
                  <div className="grid gap-3">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-foreground/90">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6">
                  <motion.button
                    onClick={() => trackEvent('assessment_cta_clicked', 'click', 'schedule_meeting', 'interactive')}
                    className={`w-full font-bold py-4 px-8 rounded-lg transition-all duration-300 ${
                      result.priority === 'critical' ? 'bg-red-600 hover:bg-red-700' :
                      result.priority === 'high' ? 'bg-gold hover:bg-gold-light' :
                      'bg-green-600 hover:bg-green-700'
                    } text-background`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {result.priority === 'critical' ? '🚨 Agendar Consultoria Urgente' :
                     result.priority === 'high' ? '⭐ Agendar Consultoria Premium' :
                     '📅 Agendar Consultoria Gratuita'}
                  </motion.button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-background via-background/95 to-gold/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="h-6 w-6 text-gold" />
            <h2 className="text-2xl md:text-3xl font-bold text-gold">
              Assessment Executivo
            </h2>
          </div>
          <p className="text-foreground/80 text-lg">
            Descubra o perfil ideal de automação para sua empresa
          </p>
        </motion.div>

        <Card className="p-6 md:p-8 bg-background/80 backdrop-blur-lg border-gold/20">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground/70">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm text-gold font-medium">
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <motion.div
                className="bg-gold rounded-full h-2"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-center mb-8">
                {questions[currentQuestion].question}
              </h3>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                    className="p-4 text-left bg-background/50 hover:bg-gold/10 border border-transparent hover:border-gold/30 rounded-lg transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <Circle className="h-5 w-5 text-gold group-hover:fill-current" />
                      <div>
                        <div className="font-medium text-foreground/90">{option.text}</div>
                        <div className="text-sm text-foreground/60">{option.description}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
};

export default ExecutiveAssessment;

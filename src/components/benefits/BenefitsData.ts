
import { DollarSign, Clock, Users, Shield, MessagesSquare } from "lucide-react";

export const benefitsData = [
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
  {
    icon: MessagesSquare,
    title: "Produtividade Multiplicada",
    problem: "Atendentes não dão conta da demanda?",
    solution: "Um único funcionário digital realiza em média 350 atendimentos por dia, enquanto um humano consegue apenas 100, aumentando sua produtividade em 250%.",
  }
];

export const chartData = [
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

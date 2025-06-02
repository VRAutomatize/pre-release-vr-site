
import React, { useState } from "react";
import { DollarSign, TrendingUp, Calendar, CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { NativeCard } from "@/components/ui/native-card";
import { NativeButton } from "@/components/ui/native-button";
import NativeMetricsCard from "@/components/mobile/NativeMetricsCard";

const MobileCommissionsView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const commissions = [
    {
      id: 1,
      client: "Tech Solutions LTDA",
      value: 850.00,
      date: "15/03/2024",
      status: "paid",
      type: "Venda Direta"
    },
    {
      id: 2,
      client: "Inovação Digital",
      value: 245.00,
      date: "12/03/2024",
      status: "pending",
      type: "Lead Qualificado"
    },
    {
      id: 3,
      client: "StartUp XYZ",
      value: 1200.00,
      date: "08/03/2024",
      status: "processing",
      type: "Venda Direta"
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "paid":
        return { 
          label: "Pago", 
          color: "text-green-400 bg-green-400/10 border-green-400/20",
          icon: <CheckCircle className="h-4 w-4" />
        };
      case "pending":
        return { 
          label: "Pendente", 
          color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
          icon: <Clock className="h-4 w-4" />
        };
      case "processing":
        return { 
          label: "Processando", 
          color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
          icon: <AlertCircle className="h-4 w-4" />
        };
      default:
        return { 
          label: "Desconhecido", 
          color: "text-gray-400 bg-gray-400/10 border-gray-400/20",
          icon: <AlertCircle className="h-4 w-4" />
        };
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="px-4 py-3">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          Suas Comissões
        </h2>
        <p className="text-sm text-gray-400">
          Acompanhe seus ganhos e solicite saques
        </p>
      </div>

      {/* Period Selector */}
      <div className="px-4">
        <div className="flex gap-2 p-1 bg-gray-800/50 rounded-lg">
          {[
            { key: "week", label: "Semana" },
            { key: "month", label: "Mês" },
            { key: "quarter", label: "Trimestre" }
          ].map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                selectedPeriod === period.key
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="px-4 space-y-4">
        <NativeMetricsCard
          title="Disponível para Saque"
          value="R$ 2.450,00"
          subtitle="Pronto para solicitação"
          icon={<DollarSign className="h-6 w-6" />}
          trend="up"
          trendValue="+R$ 320,00"
          variant="featured"
          className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border-yellow-400/20"
        />
        
        <div className="grid grid-cols-2 gap-3">
          <NativeMetricsCard
            title="Total do Mês"
            value="R$ 3.890,00"
            icon={<TrendingUp className="h-5 w-5" />}
            trend="up"
            trendValue="+25%"
            variant="compact"
          />
          
          <NativeMetricsCard
            title="Próximo Pagamento"
            value="28/03"
            icon={<Calendar className="h-5 w-5" />}
            trend="neutral"
            trendValue="5 dias"
            variant="compact"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <h3 className="text-lg font-semibold text-gray-100 mb-3">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <NativeButton variant="primary" className="h-14 flex-col gap-1">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs">Solicitar Saque</span>
          </NativeButton>
          
          <NativeButton variant="secondary" className="h-14 flex-col gap-1">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs">Ver Relatório</span>
          </NativeButton>
        </div>
      </div>

      {/* Recent Commissions */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-100">Comissões Recentes</h3>
          <NativeButton variant="ghost" size="sm">
            Ver Todas
          </NativeButton>
        </div>
        
        <div className="space-y-3">
          {commissions.map((commission) => {
            const statusInfo = getStatusInfo(commission.status);
            
            return (
              <NativeCard key={commission.id} variant="elevated" padding="md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-100 truncate">
                      {commission.client}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {commission.type}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-400">
                      R$ {commission.value.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {commission.date}
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${statusInfo.color}`}>
                  {statusInfo.icon}
                  <span className="text-sm font-medium">
                    {statusInfo.label}
                  </span>
                </div>
              </NativeCard>
            );
          })}
        </div>
      </div>

      {/* Withdrawal Info */}
      <div className="px-4 pb-6">
        <NativeCard variant="glass" padding="lg">
          <div className="text-center mb-4">
            <div className="h-16 w-16 bg-blue-400/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="h-8 w-8 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-100 mb-2">
              Informações de Saque
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              • Saques processados em até 3 dias úteis<br/>
              • Valor mínimo: R$ 100,00<br/>
              • Taxa: R$ 5,00 por transação
            </p>
          </div>
          
          <NativeButton variant="secondary" fullWidth>
            Configurar Conta Bancária
          </NativeButton>
        </NativeCard>
      </div>
    </div>
  );
};

export default MobileCommissionsView;

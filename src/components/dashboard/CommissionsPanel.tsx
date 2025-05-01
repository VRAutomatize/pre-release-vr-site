
import React from "react";
import { DollarSign, RefreshCw, BadgeDollarSign, BadgePercent, WalletMinimal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Sample commission data
const commissionData = {
  received: 3200.5,
  confirmed: 1850.75,
  pending: 950.25,
  items: [
    { id: 1, client: "Empresa ABC", value: 850.25, date: "2025-04-20", status: "Confirmado" },
    { id: 2, client: "Tech Solutions", value: 1000.50, date: "2025-04-15", status: "Confirmado" },
  ]
};

const CommissionsPanel = () => {
  const handlePaymentRequest = () => {
    // In a real application, this would send a request to the backend
    toast.success("Solicitação de pagamento enviada com sucesso!");
  };
  
  return (
    <Card className="border border-gold/20 glass-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gold flex items-center gap-2">
          <BadgeDollarSign className="h-5 w-5" />
          Comissões
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => toast.info("Atualizando comissões...")}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-background/50 p-3 shadow-sm border border-gold/10">
            <div className="flex items-center gap-2">
              <BadgeDollarSign className="h-4 w-4 text-green-600" />
              <p className="text-sm font-medium text-muted-foreground">Recebido</p>
            </div>
            <p className="mt-1 text-xl font-bold text-green-600">
              {commissionData.received.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div className="rounded-lg bg-background/50 p-3 shadow-sm border border-gold/10">
            <div className="flex items-center gap-2">
              <WalletMinimal className="h-4 w-4 text-amber-600" />
              <p className="text-sm font-medium text-muted-foreground">Confirmado</p>
            </div>
            <p className="mt-1 text-xl font-bold text-amber-600">
              {commissionData.confirmed.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div className="rounded-lg bg-background/50 p-3 shadow-sm border border-gold/10">
            <div className="flex items-center gap-2">
              <BadgePercent className="h-4 w-4 text-blue-600" />
              <p className="text-sm font-medium text-muted-foreground">Pendente</p>
            </div>
            <p className="mt-1 text-xl font-bold text-blue-600">
              {commissionData.pending.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-medium">Comissões Confirmadas</h3>
            {commissionData.items.length > 0 && (
              <Button 
                onClick={handlePaymentRequest} 
                className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-background"
                size="sm"
              >
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Solicitar Pagamento</span>
                <span className="inline sm:hidden">Solicitar</span>
              </Button>
            )}
          </div>
          
          <div className="grid gap-3 sm:grid-cols-1">
            {commissionData.items.map(item => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-gold/10 p-3 bg-background/30">
                <div className="space-y-1">
                  <p className="font-medium">{item.client}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <p className="font-semibold text-gold">
                  {item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
            ))}
          </div>
          
          {commissionData.items.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              Nenhuma comissão confirmada no momento
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionsPanel;

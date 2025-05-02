
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormData } from "./types";
import { calculateMonthlyFee, formatCurrency } from "@/utils/priceCalculation";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: FormData;
  isDirectSale: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  formData,
  isDirectSale
}: ConfirmationDialogProps) {
  const isMobile = useIsMobile();
  const monthlyFee = calculateMonthlyFee({
    envia_audio: formData.envia_audio,
    servidor_dedicado: formData.servidor_dedicado
  });
  
  // Format the implementação value
  const implementationValue = formData.valor_implementacao 
    ? formatCurrency(parseFloat(formData.valor_implementacao.replace(/[^\d.,]/g, '').replace(',', '.')))
    : "R$ 0,00";
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-h-[90vh]' : 'max-w-md max-h-[90vh]'} bg-[#1A1F2C] border border-gold/20 text-white`}>
        <DialogHeader>
          <DialogTitle className="text-gold text-xl">Confirmar {isDirectSale ? "Venda" : "Notificação"}</DialogTitle>
          <DialogDescription className="text-gold/70">
            Confirme os dados antes de {isDirectSale ? "finalizar a venda" : "notificar o time comercial"}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="pr-4 max-h-[50vh] md:max-h-[60vh]">
          <div className="space-y-4 pr-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gold/90">Dados da Empresa</h3>
              <div className="bg-black/20 p-3 rounded-md space-y-1">
                <p><span className="text-gold/80">Nome:</span> {formData.nome_empresa}</p>
                <p><span className="text-gold/80">Área:</span> {formData.area_atuacao || "Não informado"}</p>
                <p><span className="text-gold/80">Interesse:</span> {formData.interesse}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gold/90">Dados do Cliente</h3>
              <div className="bg-black/20 p-3 rounded-md space-y-1">
                <p><span className="text-gold/80">Nome:</span> {formData.nome_cliente}</p>
                <p><span className="text-gold/80">Telefone:</span> {formData.telefone_cliente}</p>
                <p><span className="text-gold/80">Email:</span> {formData.email_cliente || "Não informado"}</p>
                
                {isDirectSale && (
                  <>
                    <p><span className="text-gold/80">CNPJ:</span> {formData.cnpj}</p>
                    <p><span className="text-gold/80">Endereço:</span> {formData.endereco_comercial}</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gold/90">Detalhes de Serviço</h3>
              <div className="bg-black/20 p-3 rounded-md space-y-1">
                <p><span className="text-gold/80">Envio de Áudio:</span> {formData.envia_audio ? "Sim" : "Não"}</p>
                <p><span className="text-gold/80">Servidor Dedicado:</span> {formData.servidor_dedicado ? "Sim" : "Não"}</p>
              </div>
            </div>
            
            <Separator className="bg-gold/20" />
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gold">Resumo de Valores</h3>
              
              <div className="bg-black/20 p-3 rounded-md space-y-1">
                <p><span className="text-gold/80">Implementação:</span> {implementationValue}</p>
                
                <Separator className="bg-gold/10 my-2" />
                
                <p className="text-sm text-gold/80">Mensalidade:</p>
                <div className="pl-4 space-y-1 text-sm">
                  <p>Padrão: {formatCurrency(300)}</p>
                  {formData.envia_audio && <p>Envio de Áudio: + {formatCurrency(150)}</p>}
                  {formData.servidor_dedicado && <p>Servidor Dedicado: + {formatCurrency(90)}</p>}
                </div>
                
                <div className="mt-2 pt-2 border-t border-gold/10 flex justify-between">
                  <p className="font-medium text-gold">Total Mensal:</p>
                  <p className="font-medium text-white">{formatCurrency(monthlyFee)}</p>
                </div>
              </div>
              
              <div className="bg-gold/10 p-3 rounded-md space-y-1 text-sm">
                <div className="flex gap-2 items-center">
                  <AlertCircle className="h-4 w-4 text-gold flex-shrink-0" />
                  <p>{isDirectSale ? 
                    "Ao confirmar, o contrato será gerado e enviado ao cliente via WhatsApp" : 
                    "Ao confirmar, o time comercial será notificado"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex gap-2 sm:gap-2 mt-4">
          <Button
            variant="outline" 
            onClick={() => onClose()}
            type="button"
            className="flex-1 border-gold/20 text-gold hover:bg-gold/10"
          >
            Voltar
          </Button>
          <Button 
            onClick={() => onConfirm()}
            type="button"
            className="flex-1 bg-gold hover:bg-gold/90 text-[#1A1F2C] font-medium"
          >
            <Check className="h-4 w-4 mr-1" />
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

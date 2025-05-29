
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, ExternalLink, AlertTriangle } from "lucide-react";

interface ExecutiveConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variant: "calendar" | "whatsapp";
}

export function ExecutiveConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  variant
}: ExecutiveConfirmationModalProps) {
  const destinationText = variant === "calendar" ? "Cal.com" : "WhatsApp";
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            <DialogTitle className="text-xl font-bold text-yellow-400">
              Atendimento Executivo
            </DialogTitle>
          </div>
          <DialogDescription className="text-left space-y-3">
            <div className="flex items-start gap-2 p-3 bg-yellow-50/10 border border-yellow-400/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-foreground mb-1">
                  Requisito obrigatório:
                </p>
                <p className="text-foreground/90">
                  Este atendimento é exclusivo para empresários com faturamento mensal 
                  <span className="font-bold text-yellow-400"> superior a R$ 500.000</span>.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-3 bg-blue-50/10 border border-blue-400/20 rounded-lg">
              <ExternalLink className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-foreground mb-1">
                  Redirecionamento:
                </p>
                <p className="text-foreground/90">
                  Você será redirecionado para {destinationText} para realizar o agendamento.
                </p>
              </div>
            </div>
            
            <p className="text-sm text-foreground/80 text-center pt-2">
              Ao continuar, você declara que sua empresa atende ao requisito de faturamento.
            </p>
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
          >
            Confirmar e Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { formatCNPJ, formatPhone, formatCEP } from "@/utils/paymentUtils";
import { ClientFormData } from "./ClientRegistrationForm";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: ClientFormData;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  loading,
  data,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto glass-blur border-gold/20">
        <DialogHeader>
          <DialogTitle className="text-gold">Confirmar Cadastro de Cliente</DialogTitle>
          <DialogDescription>
            Verifique os dados antes de cadastrar o cliente
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">CNPJ</p>
              <p className="font-medium">{formatCNPJ(data.cnpj)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome da Empresa</p>
              <p className="font-medium">{data.companyName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome do Cliente</p>
              <p className="font-medium">{data.clientName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Telefone</p>
              <p className="font-medium">{formatPhone(data.phone)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">CEP</p>
              <p className="font-medium">{formatCEP(data.zipCode)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Endereço</p>
              <p className="font-medium">{data.address}, {data.number}{data.complement ? `, ${data.complement}` : ''}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bairro</p>
              <p className="font-medium">{data.district}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cidade</p>
              <p className="font-medium">{data.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <p className="font-medium">{data.state}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gold/20 text-gold hover:bg-gold/10"
          >
            Voltar e editar
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-gold hover:bg-gold/80 text-black"
            disabled={loading}
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cadastrando...</>
            ) : (
              "Confirmar e cadastrar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;


import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, Download } from "lucide-react";
import { PaymentResult } from '@/types/payment';
import { formatCurrency } from '@/utils/paymentUtils';

interface PaymentResultDisplayProps {
  result: PaymentResult;
  onBack: () => void;
}

const PaymentResultDisplay: React.FC<PaymentResultDisplayProps> = ({ 
  result, 
  onBack 
}) => {
  // Debug logging to check the result
  useEffect(() => {
    console.log("Rendering PaymentResultDisplay with result:", result);
  }, [result]);

  // Function to download QR code image
  const handleDownload = () => {
    if (!result.qrCodeImage) return;

    // Create a download link for the QR code
    const link = document.createElement('a');
    link.href = result.qrCodeImage;
    link.download = `pix-qrcode-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to share via WhatsApp
  const handleShare = () => {
    if (!result.qrCodeImage) return;

    // For WhatsApp, we'll share a text message
    const message = `Pagamento PIX no valor de ${formatCurrency(result.value)} para ${result.productName}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="glass-blur border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Pagamento Gerado</CardTitle>
        <CardDescription>
          {result.paymentMethod === 'pix' 
            ? 'Escaneie o QR Code abaixo para realizar o pagamento via PIX'
            : 'Use o link abaixo para realizar o pagamento com cartão de crédito'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {result.paymentMethod === 'pix' && result.qrCodeImage && (
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-md">
              <img 
                src={result.qrCodeImage} 
                alt="QR Code PIX" 
                className="w-64 h-64"
              />
            </div>
            <div className="text-center">
              <p className="font-semibold">{result.productName}</p>
              <p className="text-xl font-bold text-gold">
                {formatCurrency(result.value)}
              </p>
            </div>
          </div>
        )}

        {result.paymentMethod === 'credit_card' && result.paymentLink && (
          <div className="flex flex-col items-center gap-4">
            <a 
              href={result.paymentLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gold hover:bg-gold/80 text-black px-4 py-2 rounded-md font-medium"
            >
              Pagar com Cartão de Crédito
            </a>
            <div className="text-center">
              <p className="font-semibold">{result.productName}</p>
              <p className="text-xl font-bold text-gold">
                {formatCurrency(result.value)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        {result.paymentMethod === 'pix' && result.qrCodeImage && (
          <div className="flex gap-2 w-full">
            <Button 
              onClick={handleShare}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              <Share className="mr-2 h-4 w-4" /> Compartilhar via WhatsApp
            </Button>
            <Button 
              onClick={handleDownload}
              variant="outline"
              className="flex-1 border-gold/20 text-gold hover:bg-gold/10"
            >
              <Download className="mr-2 h-4 w-4" /> Baixar QR Code
            </Button>
          </div>
        )}
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="w-full border-gold/20 text-gold hover:bg-gold/10 mt-2"
        >
          Nova Cobrança
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentResultDisplay;

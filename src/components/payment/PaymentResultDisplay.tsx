import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, Download } from "lucide-react";
import { PaymentResult } from '@/types/payment';
import { formatCurrency } from '@/utils/paymentUtils';
import { useIsMobile } from '@/hooks/useIsMobile';

interface PaymentResultDisplayProps {
  result: PaymentResult;
  onBack: () => void;
}

const PaymentResultDisplay: React.FC<PaymentResultDisplayProps> = ({ 
  result, 
  onBack 
}) => {
  const isMobile = useIsMobile();

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
    const fileName = result.paymentMethod === 'pix' 
      ? `pix-qrcode-${new Date().getTime()}.png` 
      : `payment-qrcode-${new Date().getTime()}.png`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to share via WhatsApp
  const handleShare = () => {
    // Share different content based on payment method
    if (result.paymentMethod === 'pix' && result.qrCodeImage) {
      // For PIX, we'll share a text message
      const message = `Pagamento PIX no valor de ${formatCurrency(result.value)} para ${result.productName}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else if (result.paymentMethod === 'credit_card' && result.paymentLink) {
      // For credit card, we'll share the payment link
      const message = `Link de pagamento no valor de ${formatCurrency(result.value)} para ${result.productName}: ${result.paymentLink}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <Card className="glass-blur border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Pagamento Gerado</CardTitle>
        <CardDescription>
          {result.paymentMethod === 'pix' 
            ? 'Escaneie o QR Code abaixo para realizar o pagamento via PIX'
            : 'Escaneie o QR Code ou use o link abaixo para realizar o pagamento com cartão de crédito'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* QR Code display for both payment methods */}
        {result.qrCodeImage && (
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-md w-auto">
              {/* Fixed size container for QR code, especially on mobile */}
              <div className={isMobile ? "w-[240px] h-[240px]" : "w-64 h-64"}>
                <img 
                  src={result.qrCodeImage} 
                  alt={`QR Code ${result.paymentMethod === 'pix' ? 'PIX' : 'Pagamento'}`} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="font-semibold">{result.productName}</p>
              <p className="text-xl font-bold text-gold">
                {formatCurrency(result.value)}
              </p>
            </div>
          </div>
        )}

        {/* Direct link button for credit card payments */}
        {result.paymentMethod === 'credit_card' && result.paymentLink && (
          <a 
            href={result.paymentLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gold hover:bg-gold/80 text-black px-4 py-2 rounded-md font-medium mt-4"
          >
            Pagar com Cartão de Crédito
          </a>
        )}

        {/* Error message if neither QR code nor link is available */}
        {!result.qrCodeImage && !result.paymentLink && (
          <div className="text-red-500 text-center p-4">
            <p>Erro ao gerar o pagamento. Por favor, tente novamente.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        {/* Show share and download buttons for both payment methods */}
        {result.qrCodeImage && (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button 
              onClick={handleShare}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              <Share className="mr-2 h-4 w-4" /> 
              Compartilhar via WhatsApp
            </Button>
            <Button 
              onClick={handleDownload}
              variant="outline"
              className="w-full border-gold/20 text-gold hover:bg-gold/10"
            >
              <Download className="mr-2 h-4 w-4" /> 
              Baixar QR Code
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

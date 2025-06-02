
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, Download, ArrowLeft } from "lucide-react";
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
      <CardHeader className={isMobile ? "p-4 pb-2" : ""}>
        <CardTitle className="text-gold text-lg md:text-xl">Pagamento Gerado</CardTitle>
        <CardDescription className="text-gray-200 text-sm md:text-base">
          {result.paymentMethod === 'pix' 
            ? 'Escaneie o QR Code abaixo para realizar o pagamento via PIX'
            : 'Escaneie o QR Code ou use o link abaixo para realizar o pagamento com cartão de crédito'}
        </CardDescription>
      </CardHeader>
      <CardContent className={`flex flex-col items-center ${isMobile ? 'p-4 py-2' : ''}`}>
        {/* QR Code display for both payment methods */}
        {result.qrCodeImage && (
          <div className={`flex flex-col items-center ${isMobile ? 'gap-3' : 'gap-4'}`}>
            <div className={`p-3 bg-white rounded-lg w-auto ${isMobile ? 'p-2' : ''}`}>
              {/* Responsive QR code container */}
              <div className={isMobile ? "w-[220px] h-[220px]" : "w-64 h-64"}>
                <img 
                  src={result.qrCodeImage} 
                  alt={`QR Code ${result.paymentMethod === 'pix' ? 'PIX' : 'Pagamento'}`} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="text-center">
              <p className={`font-semibold text-gray-100 ${isMobile ? 'text-sm' : 'text-base'}`}>
                {result.productName}
              </p>
              <p className={`font-bold text-gold ${isMobile ? 'text-lg' : 'text-xl'}`}>
                {formatCurrency(result.value)}
              </p>
            </div>
          </div>
        )}

        {/* Direct link button for credit card payments */}
        {result.paymentMethod === 'credit_card' && result.paymentLink && (
          <Button 
            asChild
            className={`bg-gold hover:bg-gold/80 text-black font-semibold ${isMobile ? 'w-full py-3 text-base mt-3' : 'mt-4'}`}
          >
            <a 
              href={result.paymentLink} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Pagar com Cartão de Crédito
            </a>
          </Button>
        )}

        {/* Error message if neither QR code nor link is available */}
        {!result.qrCodeImage && !result.paymentLink && (
          <div className="text-red-400 text-center p-4">
            <p className={isMobile ? 'text-sm' : 'text-base'}>
              Erro ao gerar o pagamento. Por favor, tente novamente.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className={`flex flex-col ${isMobile ? 'gap-2 p-4 pt-2' : 'gap-3'}`}>
        {/* Show share and download buttons for both payment methods */}
        {result.qrCodeImage && (
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-col sm:flex-row gap-2'} w-full`}>
            <Button 
              onClick={handleShare}
              className={`bg-emerald-600 hover:bg-emerald-700 text-white font-medium ${isMobile ? 'w-full py-3 text-base' : 'w-full'}`}
            >
              <Share className="mr-2 h-4 w-4" /> 
              Compartilhar via WhatsApp
            </Button>
            <Button 
              onClick={handleDownload}
              variant="outline"
              className={`border-gold/20 text-gold hover:bg-gold/10 font-medium ${isMobile ? 'w-full py-3 text-base' : 'w-full'}`}
            >
              <Download className="mr-2 h-4 w-4" /> 
              Baixar QR Code
            </Button>
          </div>
        )}
        <Button 
          onClick={onBack} 
          variant="outline" 
          className={`border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-gray-100 hover:border-gray-500 font-medium ${isMobile ? 'w-full py-3 text-base mt-2' : 'w-full mt-2'}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Nova Cobrança
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentResultDisplay;

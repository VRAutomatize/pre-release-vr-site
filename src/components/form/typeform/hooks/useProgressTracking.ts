
import { useState, useCallback } from "react";
import { FormData } from "../types";

interface UseProgressTrackingProps {
  getValues: () => FormData;
  currentStep: number;
}

export const useProgressTracking = ({ getValues, currentStep }: UseProgressTrackingProps) => {
  const [progressData, setProgressData] = useState<Partial<FormData>>({});
  
  // Function to send partial form data to webhook
  const sendPartialData = useCallback(async () => {
    const webhookEndpoint = "https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/form-webhook";
    
    try {
      const currentValues = getValues();
      const dataToSend = { ...progressData, ...currentValues };
      setProgressData(dataToSend);
      
      console.log("Sending partial data to webhook:", {
        data: dataToSend,
        step: currentStep + 1,
        isPartial: true,
        timestamp: new Date().toISOString()
      });
      
      const response = await fetch(webhookEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: dataToSend,
          step: currentStep + 1,
          timestamp: new Date().toISOString(),
          isPartial: true
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log("Partial data sent successfully");
      
    } catch (error) {
      console.error("Failed to send partial data:", error);
      // Continue anyway, don't block the user experience
    }
  }, [getValues, progressData, currentStep]);

  return {
    progressData,
    sendPartialData
  };
};

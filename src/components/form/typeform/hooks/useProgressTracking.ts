
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
    // Always send to the specified webhook URL regardless of the props
    const webhookEndpoint = "https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/form-webhook";
    
    const currentValues = getValues();
    const dataToSend = { ...progressData, ...currentValues };
    setProgressData(dataToSend);
    
    try {
      console.log("Sending partial data to webhook:", dataToSend);
      
      // Using fetch with no-cors mode to avoid CORS issues with webhook
      await fetch(webhookEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          data: dataToSend, // Send data with 'data' key as specified
          step: currentStep,
          timestamp: new Date().toISOString(),
          isPartial: true
        }),
      });
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

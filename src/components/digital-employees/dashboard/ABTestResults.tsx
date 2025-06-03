
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "lucide-react";

interface ABTest {
  testId: string;
  testName: string;
  variants: Array<{
    id: string;
    name: string;
    conversionRate: number;
    visitors: number;
  }>;
}

interface ABTestResultsProps {
  abTests: ABTest[];
}

export const ABTestResults = ({ abTests }: ABTestResultsProps) => {
  return (
    <Card className="premium-glass border-gold/20 p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <BarChart className="h-5 w-5" />
        Resultados dos Testes A/B
      </h3>
      
      <div className="space-y-6">
        {abTests.map((test) => (
          <div key={test.testId} className="border border-gold/20 rounded-lg p-4">
            <h4 className="font-medium mb-4">{test.testName}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {test.variants.map((variant) => (
                <div key={variant.id} className="bg-black/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{variant.name}</span>
                    <Badge 
                      variant={variant.conversionRate > 8 ? "default" : "secondary"}
                      className={variant.conversionRate > 8 ? "bg-green-500" : ""}
                    >
                      {variant.conversionRate}%
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/70">
                    {variant.visitors} visitantes
                  </p>
                  {test.variants.length === 2 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gold h-2 rounded-full" 
                          style={{ 
                            width: `${(variant.conversionRate / Math.max(...test.variants.map(v => v.conversionRate))) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

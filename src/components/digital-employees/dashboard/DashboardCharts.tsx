
import React from "react";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from "recharts";

interface ChartsProps {
  conversionTrendData: Array<{
    date: string;
    conversions: number;
    rate: number;
  }>;
  funnelData: Array<{
    stage: string;
    value: number;
    color: string;
  }>;
}

export const DashboardCharts = ({ conversionTrendData, funnelData }: ChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Conversion Trend */}
      <Card className="premium-glass border-gold/20 p-6">
        <h3 className="text-lg font-semibold mb-4">Tendência de Conversões</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={conversionTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #D4AF37',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#D4AF37" 
              strokeWidth={3}
              dot={{ fill: '#D4AF37', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Funnel Analysis */}
      <Card className="premium-glass border-gold/20 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Funil de Conversão
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={funnelData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" />
            <YAxis dataKey="stage" type="category" width={100} stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #D4AF37',
                borderRadius: '8px'
              }}
              formatter={(value) => [`${value}%`, 'Taxa']}
            />
            <Bar dataKey="value" fill="#D4AF37" radius={[0, 4, 4, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

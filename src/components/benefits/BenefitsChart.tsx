
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { chartData } from './BenefitsData';

const BenefitsChart = () => {
  return (
    <div className="h-[500px] w-full relative z-10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            stroke="#ffffff80" 
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: '#ffffff40' }}
            axisLine={{ stroke: '#ffffff40' }}
          />
          <YAxis 
            stroke="#ffffff80" 
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: '#ffffff40' }}
            axisLine={{ stroke: '#ffffff40' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e1b2e',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
            cursor={{ fill: 'rgba(255,215,0,0.05)' }}
            formatter={(value) => [`${value}%`, '']}
          />
          <Bar 
            name="Antes da Automação" 
            dataKey="antes" 
            fill="#4a4658" 
            radius={[4, 4, 0, 0]}
            barSize={50}
            isAnimationActive={true}
            animationDuration={1500}
          />
          <Bar 
            name="Depois da Automação" 
            dataKey="depois" 
            fill="#FFD700" 
            radius={[4, 4, 0, 0]}
            barSize={50}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={300}
          >
            <LabelList 
              dataKey="label" 
              position="top" 
              fill="#FFD700" 
              fontSize={16} 
              fontWeight="bold"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BenefitsChart;

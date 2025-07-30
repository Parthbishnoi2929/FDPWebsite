
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend } from 'recharts';

interface StackedChartData {
  name: string;
  approved: number;
  pending: number;
  rejected: number;
}

interface ModernBarChartProps {
  data: StackedChartData[];
  height?: number;
}

const STATUS_COLORS = {
  approved: '#10B981', // Better green
  pending: '#F59E0B',  // Better orange
  rejected: '#EF4444', // Better red
};

export const ModernBarChart: React.FC<ModernBarChartProps> = ({
  data,
  height = 400,
}) => {
  const [animatedData, setAnimatedData] = useState<StackedChartData[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Start with zero values for animation
    const zeroData = data.map(item => ({
      name: item.name,
      approved: 0,
      pending: 0,
      rejected: 0,
    }));
    setAnimatedData(zeroData);
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-xl">
          <p className="font-bold text-gray-900 text-base mb-2">{label}</p>
          {payload.map((entry: any) => (
            <div key={entry.dataKey} className="flex items-center gap-2 text-sm mb-1">
              <span 
                style={{ 
                  background: entry.color, 
                  width: 12, 
                  height: 12, 
                  borderRadius: 3, 
                  display: 'inline-block' 
                }} 
              />
              <span className="capitalize font-medium">{entry.dataKey}:</span>
              <span className="font-bold text-gray-900">{entry.value}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-blue-600">{total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (value === 0) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 8}
        fill="#374151"
        textAnchor="middle"
        className="text-xs font-bold"
        fontSize="11"
      >
        {value}
      </text>
    );
  };

  // Calculate total for each bar to show on top
  const renderTotalLabel = (props: any) => {
    const { x, y, width, payload } = props;
    const total = payload.approved + payload.pending + payload.rejected;
    if (total === 0) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 25}
        fill="#1F2937"
        textAnchor="middle"
        className="text-xs font-bold"
        fontSize="12"
      >
        {total}
      </text>
    );
  };

  return (
    <div className={`w-full ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={animatedData}
          margin={{ top: 50, right: 30, left: 20, bottom: 80 }}
          barCategoryGap={15}
          barGap={2}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36} 
            wrapperStyle={{ top: 0 }}
            iconType="circle"
            iconSize={10}
          />
          
          {/* Total labels on top of each bar */}
          <Bar
            dataKey="approved"
            stackId="status"
            fill="transparent"
            radius={[0, 0, 0, 0]}
          >
            <LabelList content={renderTotalLabel} />
          </Bar>
          
          {/* Actual data bars */}
          <Bar
            dataKey="approved"
            stackId="status"
            fill={STATUS_COLORS.approved}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
            name="Approved"
          >
            <LabelList content={renderLabel} />
          </Bar>
          <Bar
            dataKey="pending"
            stackId="status"
            fill={STATUS_COLORS.pending}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
            name="Pending"
          >
            <LabelList content={renderLabel} />
          </Bar>
          <Bar
            dataKey="rejected"
            stackId="status"
            fill={STATUS_COLORS.rejected}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
            name="Rejected"
          >
            <LabelList content={renderLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

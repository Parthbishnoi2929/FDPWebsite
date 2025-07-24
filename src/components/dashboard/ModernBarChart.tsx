
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
  approved: '#00C49F',
  pending: '#FFBB28',
  rejected: '#FF4C4C',
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
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-xl">
          <p className="font-bold text-gray-900 text-base mb-2">{label}</p>
          {payload.map((entry: any) => (
            <div key={entry.dataKey} className="flex items-center gap-2 text-sm mb-1">
              <span style={{ background: entry.color, width: 10, height: 10, borderRadius: 2, display: 'inline-block' }} />
              <span className="capitalize">{entry.dataKey}:</span>
              <span className="font-bold">{entry.value}</span>
            </div>
          ))}
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
      >
        {value}
      </text>
    );
  };

  return (
    <div className={`w-full ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={animatedData}
          margin={{ top: 40, right: 30, left: 20, bottom: 80 }}
          barCategoryGap={20}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: '#6b7280', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 14, fill: '#6b7280', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ top: 0 }} />
          <Bar
            dataKey="approved"
            stackId="status"
            fill={STATUS_COLORS.approved}
            radius={[12, 12, 0, 0]}
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
            radius={[12, 12, 0, 0]}
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
            radius={[12, 12, 0, 0]}
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

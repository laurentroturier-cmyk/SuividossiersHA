import React from 'react';

interface IndicatorTileProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const IndicatorTile: React.FC<IndicatorTileProps> = ({ label, value, icon }) => (
  <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-w-[180px] min-h-[120px]">
    {icon && <div className="mb-2 text-primary">{icon}</div>}
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-xs text-gray-500 uppercase tracking-wider text-center">{label}</div>
  </div>
);

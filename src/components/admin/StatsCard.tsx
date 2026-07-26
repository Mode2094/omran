import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color?: string;
}

export default function StatsCard({ title, value, icon, color = "primary" }: StatsCardProps) {
  const colors: Record<string, string> = {
    primary: "bg-primary-50 text-primary-500",
    accent: "bg-accent-50 text-accent-500",
    gold: "bg-gold-50 text-gold-500",
    red: "bg-red-50 text-red-500",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 font-arabic">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

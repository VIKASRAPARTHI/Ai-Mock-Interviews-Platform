import Image from "next/image";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
}

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <div className="card-border flex-1 min-w-[120px]">
      <div className="card p-3">
        <div className="flex flex-col items-center text-center">
          <div className="blue-gradient rounded-full p-1.5 mb-1.5">
            <Image src={icon} alt={title} width={14} height={14} />
          </div>
          <p className="text-light-100 text-xs mb-1">{title}</p>
          <h3 className="text-base font-bold text-white mb-0.5">{value}</h3>
          {trend && (
            <p className="text-success-100 text-xs">{trend}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
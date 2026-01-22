import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "critical" | "warning" | "success";
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) => {
  const variantStyles = {
    default: "bg-card border-border",
    critical: "bg-emergency-critical/10 border-emergency-critical/30",
    warning: "bg-emergency-high/10 border-emergency-high/30",
    success: "bg-emergency-low/10 border-emergency-low/30",
  };

  const iconStyles = {
    default: "bg-primary/10 text-primary",
    critical: "bg-emergency-critical/20 text-emergency-critical",
    warning: "bg-emergency-high/20 text-emergency-high",
    success: "bg-emergency-low/20 text-emergency-low",
  };

  return (
    <div
      className={cn(
        "rounded-xl border p-6 transition-all hover:shadow-md",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p
              className={cn(
                "mt-1 text-sm font-medium",
                trend.value >= 0 ? "text-emergency-low" : "text-emergency-critical"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className={cn("rounded-lg p-3", iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;

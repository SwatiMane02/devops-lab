import { cn } from "@/lib/utils";

type Severity = "low" | "medium" | "high" | "critical";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const severityConfig: Record<
  Severity,
  { label: string; className: string }
> = {
  low: {
    label: "Low",
    className: "bg-emergency-low text-emergency-low-foreground",
  },
  medium: {
    label: "Medium",
    className: "bg-emergency-medium text-emergency-medium-foreground",
  },
  high: {
    label: "High",
    className: "bg-emergency-high text-emergency-high-foreground",
  },
  critical: {
    label: "Critical",
    className: "bg-emergency-critical text-emergency-critical-foreground animate-pulse",
  },
};

const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  const config = severityConfig[severity];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export default SeverityBadge;

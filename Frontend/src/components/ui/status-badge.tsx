import { cn } from "@/lib/utils";

type Status = "available" | "busy" | "offline";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  available: {
    label: "Available",
    className: "bg-emergency-available text-emergency-low-foreground",
  },
  busy: {
    label: "Busy",
    className: "bg-emergency-busy text-emergency-high-foreground",
  },
  offline: {
    label: "Offline",
    className: "bg-emergency-offline text-secondary-foreground",
  },
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className
      )}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
};

export default StatusBadge;

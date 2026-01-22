import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
import { MapPin, Clock, LucideIcon } from "lucide-react";

export type ResourceStatus = "available" | "busy" | "offline";

interface ResourceCardProps {
  name: string;
  type: string;
  icon: LucideIcon;
  status: ResourceStatus;
  location: string;
  lastUpdated: string;
  count?: number;
  onAssign?: () => void;
}

const ResourceCard = ({
  name,
  type,
  icon: Icon,
  status,
  location,
  lastUpdated,
  count,
  onAssign,
}: ResourceCardProps) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{type}</p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent>
        {count !== undefined && (
          <div className="mb-3 text-center">
            <span className="text-3xl font-bold text-foreground">{count}</span>
            <span className="ml-1 text-sm text-muted-foreground">units</span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {lastUpdated}
          </span>
        </div>
        {status === "available" && onAssign && (
          <Button
            size="sm"
            className="mt-3 w-full"
            onClick={onAssign}
          >
            Assign Resource
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;

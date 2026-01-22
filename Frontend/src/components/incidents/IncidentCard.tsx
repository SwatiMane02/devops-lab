import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SeverityBadge from "@/components/ui/severity-badge";
import { MapPin, Clock, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type IncidentType = "fire" | "medical" | "flood" | "accident" | "crime";
export type Severity = "low" | "medium" | "high" | "critical";

interface IncidentCardProps {
  id: string;
  type: IncidentType;
  title: string;
  location: string;
  severity: Severity;
  reportedAt: string;
  reportedBy: string;
  description: string;
  onClick?: () => void;
}

const incidentTypeConfig: Record<IncidentType, { label: string; emoji: string }> = {
  fire: { label: "Fire", emoji: "🔥" },
  medical: { label: "Medical", emoji: "🏥" },
  flood: { label: "Flood", emoji: "🌊" },
  accident: { label: "Accident", emoji: "🚗" },
  crime: { label: "Crime", emoji: "🚨" },
};

const IncidentCard = ({
  type,
  title,
  location,
  severity,
  reportedAt,
  reportedBy,
  description,
  onClick,
}: IncidentCardProps) => {
  const typeConfig = incidentTypeConfig[type];

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg",
        severity === "critical" && "border-emergency-critical/50 bg-emergency-critical/5"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{typeConfig.emoji}</span>
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{typeConfig.label}</p>
            </div>
          </div>
          <SeverityBadge severity={severity} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {reportedAt}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {reportedBy}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="mt-3 w-full justify-between">
          View Details
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import InteractiveMap from "@/components/map/InteractiveMap";
import IncidentCard from "@/components/incidents/IncidentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flame, Heart, Droplets, Car, ShieldAlert, Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import FloatingReportButton from "@/components/layout/FloatingReportButton";

type IncidentType = "fire" | "medical" | "flood" | "accident" | "crime";
type Severity = "low" | "medium" | "high" | "critical";
type Status = "active" | "responding" | "resolved";

interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  location: string;
  severity: Severity;
  status: Status;
  reportedAt: string;
  reportedBy: string;
  description: string;
}

const mockIncidents: Incident[] = [
  {
    id: "1",
    type: "fire",
    title: "Building Fire on 5th Avenue",
    location: "234 5th Avenue",
    severity: "critical",
    status: "active",
    reportedAt: "2 min ago",
    reportedBy: "John D.",
    description: "Large fire visible from street. Multiple floors affected. Evacuation in progress.",
  },
  {
    id: "2",
    type: "medical",
    title: "Medical Emergency - Cardiac",
    location: "Central Park West",
    severity: "high",
    status: "responding",
    reportedAt: "8 min ago",
    reportedBy: "Sarah M.",
    description: "Elderly person collapsed. CPR being administered by bystander.",
  },
  {
    id: "3",
    type: "accident",
    title: "Multi-Vehicle Collision",
    location: "Highway 101 Exit 23",
    severity: "high",
    status: "responding",
    reportedAt: "15 min ago",
    reportedBy: "Traffic Cam",
    description: "Three vehicles involved. Traffic blocked in both directions.",
  },
  {
    id: "4",
    type: "flood",
    title: "Street Flooding",
    location: "Downtown District",
    severity: "medium",
    status: "active",
    reportedAt: "25 min ago",
    reportedBy: "City Sensors",
    description: "Water level rising due to storm drain blockage. Some vehicles stranded.",
  },
  {
    id: "5",
    type: "crime",
    title: "Robbery in Progress",
    location: "Oak Street Mall",
    severity: "high",
    status: "responding",
    reportedAt: "3 min ago",
    reportedBy: "Security",
    description: "Armed individual spotted. Area being evacuated. Police en route.",
  },
  {
    id: "6",
    type: "medical",
    title: "Allergic Reaction",
    location: "Riverside Restaurant",
    severity: "medium",
    status: "resolved",
    reportedAt: "45 min ago",
    reportedBy: "Staff",
    description: "Customer experiencing severe allergic reaction. EpiPen administered.",
  },
];

const typeFilters: { type: IncidentType | "all"; label: string; icon?: React.ElementType }[] = [
  { type: "all", label: "All" },
  { type: "fire", label: "Fire", icon: Flame },
  { type: "medical", label: "Medical", icon: Heart },
  { type: "flood", label: "Flood", icon: Droplets },
  { type: "accident", label: "Accident", icon: Car },
  { type: "crime", label: "Crime", icon: ShieldAlert },
];

const LiveMap = () => {
  const [selectedType, setSelectedType] = useState<IncidentType | "all">("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredIncidents = mockIncidents.filter((incident) => {
    if (selectedType !== "all" && incident.type !== selectedType) return false;
    if (selectedSeverity !== "all" && incident.severity !== selectedSeverity) return false;
    if (searchQuery && !incident.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeCount = filteredIncidents.filter((i) => i.status === "active").length;
  const respondingCount = filteredIncidents.filter((i) => i.status === "responding").length;

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar userRole="volunteer" />

      <div className="flex flex-1 overflow-hidden">
        {/* Map Area */}
        <div className="relative flex-1">
          <InteractiveMap className="h-full rounded-none border-0" />

          {/* Toggle Sidebar Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute left-4 top-4 z-10 gap-2 shadow-lg"
          >
            <Filter className="h-4 w-4" />
            {sidebarOpen ? "Hide" : "Show"} Panel
          </Button>

          {/* Status Summary */}
          <div className="absolute bottom-4 left-4 z-10 flex gap-2">
            <Badge variant="destructive" className="gap-1 bg-emergency-critical">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emergency-critical-foreground" />
              {activeCount} Active
            </Badge>
            <Badge variant="secondary" className="gap-1 bg-emergency-high text-emergency-high-foreground">
              {respondingCount} Responding
            </Badge>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-full max-w-md border-l border-border bg-card">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="border-b border-border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Incidents</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search incidents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Type Filters */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {typeFilters.map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                        selectedType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {Icon && <Icon className="h-3 w-3" />}
                      {label}
                    </button>
                  ))}
                </div>

                {/* Severity Filter */}
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Incident List */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {filteredIncidents.map((incident) => (
                    <IncidentCard
                      key={incident.id}
                      {...incident}
                      onClick={() => console.log("View incident:", incident.id)}
                    />
                  ))}

                  {filteredIncidents.length === 0 && (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No incidents match your filters</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>

      <FloatingReportButton />
    </div>
  );
};

export default LiveMap;

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ResourceCard from "@/components/resources/ResourceCard";
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
import {
  Ambulance,
  Building2,
  Users,
  Package,
  Search,
  RefreshCw,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import FloatingReportButton from "@/components/layout/FloatingReportButton";

type ResourceStatus = "available" | "busy" | "offline";

interface Resource {
  id: string;
  name: string;
  type: string;
  category: "ambulance" | "hospital" | "rescue" | "supplies";
  icon: LucideIcon;
  status: ResourceStatus;
  location: string;
  lastUpdated: string;
  count?: number;
}

const mockResources: Resource[] = [
  {
    id: "1",
    name: "Ambulance Unit 12",
    type: "Emergency Medical",
    category: "ambulance",
    icon: Ambulance,
    status: "available",
    location: "Station Alpha",
    lastUpdated: "2 min ago",
  },
  {
    id: "2",
    name: "Ambulance Unit 7",
    type: "Emergency Medical",
    category: "ambulance",
    icon: Ambulance,
    status: "busy",
    location: "En route to Central Park",
    lastUpdated: "5 min ago",
  },
  {
    id: "3",
    name: "City General Hospital",
    type: "Medical Facility",
    category: "hospital",
    icon: Building2,
    status: "available",
    location: "Downtown",
    lastUpdated: "1 min ago",
    count: 45,
  },
  {
    id: "4",
    name: "Memorial Medical Center",
    type: "Medical Facility",
    category: "hospital",
    icon: Building2,
    status: "busy",
    location: "West District",
    lastUpdated: "3 min ago",
    count: 12,
  },
  {
    id: "5",
    name: "Rescue Team Alpha",
    type: "Search & Rescue",
    category: "rescue",
    icon: Users,
    status: "available",
    location: "Fire Station 3",
    lastUpdated: "10 min ago",
    count: 8,
  },
  {
    id: "6",
    name: "Rescue Team Bravo",
    type: "Search & Rescue",
    category: "rescue",
    icon: Users,
    status: "busy",
    location: "5th Avenue Incident",
    lastUpdated: "2 min ago",
    count: 6,
  },
  {
    id: "7",
    name: "Food Supply Depot",
    type: "Emergency Supplies",
    category: "supplies",
    icon: Package,
    status: "available",
    location: "Warehouse District",
    lastUpdated: "1 hour ago",
    count: 500,
  },
  {
    id: "8",
    name: "Mobile Medical Unit",
    type: "Emergency Medical",
    category: "ambulance",
    icon: Ambulance,
    status: "offline",
    location: "Maintenance Bay",
    lastUpdated: "6 hours ago",
  },
];

const categoryFilters = [
  { value: "all", label: "All Resources" },
  { value: "ambulance", label: "Ambulances" },
  { value: "hospital", label: "Hospitals" },
  { value: "rescue", label: "Rescue Teams" },
  { value: "supplies", label: "Supplies" },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredResources = mockResources.filter((resource) => {
    if (selectedCategory !== "all" && resource.category !== selectedCategory) return false;
    if (selectedStatus !== "all" && resource.status !== selectedStatus) return false;
    if (searchQuery && !resource.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const statusCounts = {
    available: mockResources.filter((r) => r.status === "available").length,
    busy: mockResources.filter((r) => r.status === "busy").length,
    offline: mockResources.filter((r) => r.status === "offline").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="agency" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Resource Tracking</h1>
            <p className="mt-1 text-muted-foreground">
              Monitor and manage emergency response resources
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Status
          </Button>
        </div>

        {/* Status Summary */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Badge
            variant="secondary"
            className={cn(
              "cursor-pointer px-4 py-2 text-sm",
              selectedStatus === "all" ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => setSelectedStatus("all")}
          >
            All ({mockResources.length})
          </Badge>
          <Badge
            variant="secondary"
            className={cn(
              "cursor-pointer gap-1 px-4 py-2 text-sm",
              selectedStatus === "available" ? "bg-emergency-available text-emergency-low-foreground" : "bg-emergency-available/20 text-emergency-available"
            )}
            onClick={() => setSelectedStatus("available")}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            Available ({statusCounts.available})
          </Badge>
          <Badge
            variant="secondary"
            className={cn(
              "cursor-pointer gap-1 px-4 py-2 text-sm",
              selectedStatus === "busy" ? "bg-emergency-busy text-emergency-high-foreground" : "bg-emergency-busy/20 text-emergency-busy"
            )}
            onClick={() => setSelectedStatus("busy")}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            Busy ({statusCounts.busy})
          </Badge>
          <Badge
            variant="secondary"
            className={cn(
              "cursor-pointer gap-1 px-4 py-2 text-sm",
              selectedStatus === "offline" ? "bg-emergency-offline text-secondary-foreground" : "bg-emergency-offline/20 text-emergency-offline"
            )}
            onClick={() => setSelectedStatus("offline")}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            Offline ({statusCounts.offline})
          </Badge>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Resource Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              name={resource.name}
              type={resource.type}
              icon={resource.icon}
              status={resource.status}
              location={resource.location}
              lastUpdated={resource.lastUpdated}
              count={resource.count}
              onAssign={() => console.log("Assign resource:", resource.id)}
            />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="py-12 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium text-foreground">No resources found</p>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <FloatingReportButton />
    </div>
  );
};

export default Resources;

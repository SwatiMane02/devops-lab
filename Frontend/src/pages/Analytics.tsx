import Navbar from "@/components/layout/Navbar";
import StatCard from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import FloatingReportButton from "@/components/layout/FloatingReportButton";

const incidentTrendData = [
  { name: "Mon", incidents: 12, resolved: 10 },
  { name: "Tue", incidents: 19, resolved: 17 },
  { name: "Wed", incidents: 15, resolved: 14 },
  { name: "Thu", incidents: 22, resolved: 20 },
  { name: "Fri", incidents: 28, resolved: 25 },
  { name: "Sat", incidents: 14, resolved: 14 },
  { name: "Sun", incidents: 9, resolved: 9 },
];

const responseTimeData = [
  { type: "Fire", time: 4.2 },
  { type: "Medical", time: 5.1 },
  { type: "Accident", time: 6.3 },
  { type: "Flood", time: 8.7 },
  { type: "Crime", time: 7.2 },
];

const incidentTypeData = [
  { name: "Fire", value: 18, color: "hsl(0, 72%, 50%)" },
  { name: "Medical", value: 35, color: "hsl(200, 98%, 39%)" },
  { name: "Accident", value: 25, color: "hsl(25, 95%, 53%)" },
  { name: "Flood", value: 12, color: "hsl(200, 80%, 50%)" },
  { name: "Crime", value: 10, color: "hsl(215, 24%, 26%)" },
];

const heatmapData = [
  { zone: "Downtown", level: "high", incidents: 45 },
  { zone: "West District", level: "medium", incidents: 28 },
  { zone: "Industrial Area", level: "high", incidents: 38 },
  { zone: "Residential North", level: "low", incidents: 12 },
  { zone: "Central Park Area", level: "medium", incidents: 22 },
  { zone: "Harbor District", level: "low", incidents: 8 },
];

const levelColors = {
  high: "bg-emergency-critical/20 border-emergency-critical text-emergency-critical",
  medium: "bg-emergency-high/20 border-emergency-high text-emergency-high",
  low: "bg-emergency-low/20 border-emergency-low text-emergency-low",
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="agency" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
            <p className="mt-1 text-muted-foreground">
              Monitor emergency response performance and trends
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Incidents"
            value={119}
            icon={AlertTriangle}
            variant="critical"
            trend={{ value: -8, label: "vs last week" }}
          />
          <StatCard
            title="Avg Response Time"
            value="5.2 min"
            icon={Clock}
            variant="warning"
            trend={{ value: -12, label: "improvement" }}
          />
          <StatCard
            title="Resolution Rate"
            value="94%"
            icon={TrendingUp}
            variant="success"
            trend={{ value: 3, label: "vs last week" }}
          />
          <StatCard
            title="Active Responders"
            value={156}
            icon={Users}
            variant="default"
            trend={{ value: 15, label: "increase" }}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Incident Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Incident Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={incidentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="incidents"
                      stroke="hsl(var(--emergency-critical))"
                      fill="hsl(var(--emergency-critical) / 0.2)"
                      name="Incidents"
                    />
                    <Area
                      type="monotone"
                      dataKey="resolved"
                      stroke="hsl(var(--emergency-low))"
                      fill="hsl(var(--emergency-low) / 0.2)"
                      name="Resolved"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Response Time by Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Response Time by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={responseTimeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" unit=" min" className="text-muted-foreground" />
                    <YAxis dataKey="type" type="category" width={70} className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value} min`, "Avg Response Time"]}
                    />
                    <Bar dataKey="time" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Incident Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Incident Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incidentTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {incidentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {incidentTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* High-Risk Zones */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-emergency-critical" />
                High-Risk Zone Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {heatmapData.map((zone) => (
                  <div
                    key={zone.zone}
                    className={`rounded-lg border p-4 ${levelColors[zone.level]}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{zone.zone}</p>
                        <p className="text-sm opacity-80">
                          {zone.incidents} incidents this week
                        </p>
                      </div>
                      <span className="rounded-full bg-current/20 px-2 py-0.5 text-xs font-semibold uppercase">
                        {zone.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FloatingReportButton />
    </div>
  );
};

export default Analytics;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Flame,
  Heart,
  Droplets,
  Car,
  ShieldAlert,
  MapPin,
  Upload,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type IncidentType = "fire" | "medical" | "flood" | "accident" | "crime";
type Severity = "low" | "medium" | "high" | "critical";

const incidentTypes: { type: IncidentType; label: string; icon: React.ElementType }[] = [
  { type: "fire", label: "Fire", icon: Flame },
  { type: "medical", label: "Medical", icon: Heart },
  { type: "flood", label: "Flood", icon: Droplets },
  { type: "accident", label: "Accident", icon: Car },
  { type: "crime", label: "Crime", icon: ShieldAlert },
];

const severityLevels: { level: Severity; label: string; description: string }[] = [
  { level: "low", label: "Low", description: "Minor issue, no immediate danger" },
  { level: "medium", label: "Medium", description: "Moderate concern, needs attention" },
  { level: "high", label: "High", description: "Serious situation, urgent response" },
  { level: "critical", label: "Critical", description: "Life-threatening emergency" },
];

const severityColors: Record<Severity, string> = {
  low: "border-emergency-low bg-emergency-low/10 text-emergency-low",
  medium: "border-emergency-medium bg-emergency-medium/10 text-emergency-medium",
  high: "border-emergency-high bg-emergency-high/10 text-emergency-high",
  critical: "border-emergency-critical bg-emergency-critical/10 text-emergency-critical",
};

const ReportIncident = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<IncidentType | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGetLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          setIsLocating(false);
        },
        () => {
          setLocation("123 Main Street, Downtown");
          setIsLocating(false);
        }
      );
    } else {
      setLocation("123 Main Street, Downtown");
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !selectedSeverity || !description || !location) return;
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(false);
      navigate("/map");
    }, 2000);
  };

  const isFormValid = selectedType && selectedSeverity && description && location;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Report an Incident</h1>
          <p className="mt-2 text-muted-foreground">
            Provide details about the emergency to help responders arrive prepared
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Incident Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What type of incident?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {incidentTypes.map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                      selectedType === type
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Icon className={cn(
                      "h-8 w-8",
                      selectedType === type ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-sm font-medium",
                      selectedType === type ? "text-primary" : "text-muted-foreground"
                    )}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Severity Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How severe is it?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {severityLevels.map(({ level, label, description }) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedSeverity(level)}
                    className={cn(
                      "flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
                      selectedSeverity === level
                        ? severityColors[level]
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <span className="text-lg font-semibold">{label}</span>
                    <span className="text-sm opacity-80">{description}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Where is it happening?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Enter address or coordinates"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="gap-2"
                >
                  {isLocating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  {isLocating ? "Locating..." : "Use GPS"}
                </Button>
              </div>

              {/* Map Preview */}
              <div className="relative h-48 overflow-hidden rounded-lg border border-border bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-emergency-critical" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {location || "Select a location"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Describe the situation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Provide details that would help responders (what you see, number of people involved, any hazards, etc.)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />

              {/* Image Upload */}
              <div>
                <Label className="mb-2 block text-sm text-muted-foreground">
                  Attach photos (optional)
                </Label>
                <div className="flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:border-primary/50">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                    <p className="mt-1 text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            disabled={!isFormValid}
            className="w-full gap-2 bg-emergency-critical text-emergency-critical-foreground hover:bg-emergency-critical/90"
          >
            Submit Report
          </Button>
        </form>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emergency-low" />
              Confirm Your Report
            </DialogTitle>
            <DialogDescription>
              Please verify the information before submitting
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-muted p-4 text-sm">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium capitalize">{selectedType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Severity:</span>
                  <span className="font-medium capitalize">{selectedSeverity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{location}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="flex-1"
            >
              Edit Report
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="flex-1 gap-2 bg-emergency-critical text-emergency-critical-foreground hover:bg-emergency-critical/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Confirm & Submit"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportIncident;

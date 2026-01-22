import { useState } from "react";
import { cn } from "@/lib/utils";
import { MapPin, ZoomIn, ZoomOut, Locate, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeverityBadge from "@/components/ui/severity-badge";

type Severity = "low" | "medium" | "high" | "critical";

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: string;
  severity: Severity;
  title: string;
}

interface InteractiveMapProps {
  markers?: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
  className?: string;
  showControls?: boolean;
}

const mockMarkers: MapMarker[] = [
  { id: "1", lat: 40.7128, lng: -74.006, type: "fire", severity: "critical", title: "Building Fire" },
  { id: "2", lat: 40.7589, lng: -73.9851, type: "medical", severity: "high", title: "Medical Emergency" },
  { id: "3", lat: 40.7484, lng: -73.9857, type: "accident", severity: "medium", title: "Traffic Accident" },
  { id: "4", lat: 40.7614, lng: -73.9776, type: "flood", severity: "low", title: "Minor Flooding" },
  { id: "5", lat: 40.7282, lng: -73.7949, type: "crime", severity: "high", title: "Theft Report" },
];

const markerColors: Record<Severity, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-500 animate-pulse",
};

export default function InteractiveMap({
  markers = mockMarkers,
  onMarkerClick,
  className,
  showControls = true,
}: InteractiveMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [zoom, setZoom] = useState(12);

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    onMarkerClick?.(marker);
  };

  // Calculate center of all markers
  const centerLat = 40.741;
  const centerLng = -73.989;

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-border bg-card h-full", className)}>
      {/* OpenStreetMap iframe */}
      <div className="relative h-full w-full">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${centerLng - 0.1},${centerLat - 0.1},${centerLng + 0.1},${centerLat + 0.1}&layer=mapnik&marker=${centerLat},${centerLng}`}
          style={{ border: 0, minHeight: '100%' }}
          className="absolute inset-0"
        />
        
        {/* Overlay markers on top of the map */}
        <div className="absolute inset-0 pointer-events-none">
          {markers.map((marker, index) => (
            <button
              key={marker.id}
              onClick={() => handleMarkerClick(marker)}
              className={cn(
                "absolute flex items-center justify-center transition-transform hover:scale-125 pointer-events-auto",
                selectedMarker?.id === marker.id && "scale-125 z-20"
              )}
              style={{
                left: `${15 + (index * 17) % 70}%`,
                top: `${20 + (index * 23) % 60}%`,
              }}
            >
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-full shadow-xl border-2 border-white", markerColors[marker.severity])}>
                <MapPin className="h-5 w-5 text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Marker Info */}
      {selectedMarker && (
        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-border bg-card p-4 shadow-lg z-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{selectedMarker.title}</h4>
              <p className="text-sm text-muted-foreground capitalize">{selectedMarker.type}</p>
            </div>
            <SeverityBadge severity={selectedMarker.severity} />
          </div>
        </div>
      )}

      {/* Map Controls */}
      {showControls && (
        <div className="absolute right-4 top-4 flex flex-col gap-2 z-50">
          <Button variant="secondary" size="icon" onClick={() => setZoom(Math.min(zoom + 1, 18))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => setZoom(Math.max(zoom - 1, 1))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon">
            <Locate className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Zoom Level */}
      <div className="absolute bottom-4 right-4 rounded bg-card/90 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur shadow-lg z-50 border">
        Zoom: {zoom}x
      </div>
    </div>
  );
}

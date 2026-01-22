import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingReportButton = () => {
  return (
    <Link to="/report" className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="h-14 gap-2 rounded-full bg-emergency-critical px-6 text-emergency-critical-foreground shadow-lg transition-transform hover:scale-105 hover:bg-emergency-critical/90"
      >
        <AlertTriangle className="h-5 w-5" />
        <span className="font-semibold">Report Incident</span>
      </Button>
    </Link>
  );
};

export default FloatingReportButton;

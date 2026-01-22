import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui/stat-card";
import Navbar from "@/components/layout/Navbar";
import FloatingReportButton from "@/components/layout/FloatingReportButton";
import InteractiveMap from "@/components/map/InteractiveMap";
import {
  AlertTriangle,
  MapPin,
  Users,
  Package,
  ArrowRight,
  Shield,
  Clock,
  Phone,
} from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-card via-background to-primary/5">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emergency-critical/30 bg-emergency-critical/10 px-4 py-1.5 text-sm font-medium text-emergency-critical">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emergency-critical" />
                Live Emergency Updates
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl xl:text-6xl">
                Report Faster.{" "}
                <span className="text-primary">Respond Smarter.</span>{" "}
                <span className="text-emergency-critical">Save Lives.</span>
              </h1>
              <p className="mb-8 max-w-lg text-lg text-muted-foreground">
                A centralized platform connecting communities, volunteers, and agencies 
                for rapid emergency response. Every second counts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/report">
                  <Button size="lg" className="gap-2 bg-emergency-critical text-emergency-critical-foreground hover:bg-emergency-critical/90">
                    <AlertTriangle className="h-5 w-5" />
                    Report Incident
                  </Button>
                </Link>
                <Link to="/map">
                  <Button size="lg" variant="outline" className="gap-2">
                    <MapPin className="h-5 w-5" />
                    View Live Map
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <img
                src={heroIllustration}
                alt="Emergency Response Team"
                className="max-h-[400px] w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="border-b border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">Real-Time Emergency Status</h2>
            <p className="mt-2 text-muted-foreground">
              Live statistics from our emergency response network
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Active Incidents"
              value={23}
              icon={AlertTriangle}
              variant="critical"
              trend={{ value: -12, label: "from yesterday" }}
            />
            <StatCard
              title="Available Resources"
              value={156}
              icon={Package}
              variant="success"
              trend={{ value: 8, label: "this week" }}
            />
            <StatCard
              title="Volunteers Online"
              value={342}
              icon={Users}
              variant="default"
              trend={{ value: 15, label: "increase" }}
            />
            <StatCard
              title="Avg Response Time"
              value="4.2 min"
              icon={Clock}
              variant="warning"
              trend={{ value: -18, label: "improvement" }}
            />
          </div>
        </div>
      </section>

      {/* Live Map Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Live Incident Map</h2>
              <p className="mt-1 text-muted-foreground">
                Color-coded markers show active incidents by severity
              </p>
            </div>
            <Link to="/map">
              <Button variant="outline" className="gap-2">
                Full Screen Map
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <InteractiveMap className="h-[400px]" />
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Empowering Emergency Response
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Built for every role in the emergency response chain
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-6 text-center transition-all hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Community Members</h3>
              <p className="text-muted-foreground">
                Report incidents instantly with GPS location, photos, and severity levels.
                Receive real-time alerts for your area.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6 text-center transition-all hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emergency-high/10">
                <Shield className="h-8 w-8 text-emergency-high" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Volunteers</h3>
              <p className="text-muted-foreground">
                Get assigned to incidents based on location and skills.
                Coordinate with teams and track your impact.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6 text-center transition-all hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emergency-critical/10">
                <Phone className="h-8 w-8 text-emergency-critical" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Government Agencies</h3>
              <p className="text-muted-foreground">
                Full dashboard with analytics, resource management, and multi-agency
                coordination tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
            Ready to Make a Difference?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Join our network of responders and help save lives in your community
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="gap-2">
                <Users className="h-5 w-5" />
                Join as Volunteer
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Register Your Agency
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emergency-critical">
                <AlertTriangle className="h-4 w-4 text-emergency-critical-foreground" />
              </div>
              <span className="font-semibold text-foreground">EmergencyHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 EmergencyHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground">Terms</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      <FloatingReportButton />
    </div>
  );
};

export default Index;

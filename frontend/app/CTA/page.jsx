import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Navigation2,
  Clock,
  Zap,
  TrendingDown,
  Check,
  ArrowRight,
  MapPin,
  Route,
  Users,
  Star,
} from "lucide-react";
import "../globals.css";
export default function CTAPage() {
  const isLoggedIn = Boolean(localStorage.getItem("userEmail"));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left - Copy */}
            <div className="flex flex-col gap-8">
              {/* <Badge className="w-fit bg-blue-700 p-2" variant="secondary">
                <Zap className="mr-1.5 h-3.5 w-3.5" />
                AI-Powered Route Optimization
              </Badge> */}

              <div className="space-y-6">
                <h1 className="text-5xl text-blue-700 font-bold leading-tight tracking-tight text-balance sm:text-6xl lg:text-7xl">
                  Never sit in traffic again
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-xl">
                  Save hours every week with AI-powered route optimization.
                  Real-time traffic updates keep you moving when everyone else
                  is stuck.
                </p>
              </div>

              {/* <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base h-12 px-8" asChild>
                  <Link to="/signup">
                    Get started for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base h-12 px-8 bg-transparent" asChild>
                  <Link to="/home">View demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div> */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isLoggedIn ? (
                  <>
                    <Button size="lg" className="text-base h-12 px-8" asChild>
                      <Link to="/savedRoutes">
                        View Saved Routes
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base h-12 px-8 bg-transparent"
                      asChild
                    >
                      <Link to="/home">
                        Go to Map
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" className="text-base h-12 px-8" asChild>
                      <Link to="/signup">
                        Get started for free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base h-12 px-8 bg-transparent"
                      asChild
                    >
                      <Link to="/home">
                        Go to Map
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No credit card</span>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative lg:pl-8">
              <div className="relative rounded-2xl border border-border bg-card p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-blue-700">
                        Time Saved Today
                      </p>
                      <p className="text-4xl font-bold text-blue-600">2h 43m</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-border bg-accent p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary p-2">
                          <Route className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Fastest Route</p>
                          <p className="text-xs text-muted-foreground">
                            23 min • 12.4 miles
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-500/10 text-green-700 dark:text-green-400"
                      >
                        −15 min
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-border p-4 opacity-60">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-muted p-2">
                          <Route className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Regular Route</p>
                          <p className="text-xs text-muted-foreground">
                            38 min • 11.8 miles
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-primary">250K+</p>
                      <p className="text-xs text-muted-foreground">
                        Active users
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-primary">1.2M</p>
                      <p className="text-xs text-muted-foreground">
                        Routes daily
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-primary">35%</p>
                      <p className="text-xs text-muted-foreground">
                        Time saved
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      {/* <section className="border-y border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm text-blue-800 font-medium mb-8">
            Trusted by commuters at leading companies
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 items-center justify-items-center opacity-60">
            {["TechCorp", "DeliverFast", "RideShare", "LogisticsPro"].map((company) => (
              <div key={company} className="text-2xl text-blue-700 font-bold">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl text-blue-700 font-bold tracking-tight sm:text-5xl text-balance">
              The smartest way to navigate traffic
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              AI technology that learns from millions of routes to save you
              time, fuel, and frustration every single day.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden border border-border p-8 hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl text-blue-600 font-semibold">
                  Real-time Traffic Analysis
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get live updates on accidents, construction, and congestion.
                  Our AI predicts traffic patterns before they happen.
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-border p-8 hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-blue-600">
                  35% Faster Commutes
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Save an average of 45 minutes per day. That's 15 hours per
                  month back in your life to do what matters.
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-border p-8 hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-blue-600">
                  Multi-stop Optimization
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Running errands? Add unlimited stops and let our AI calculate
                  the most efficient route automatically.
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-border p-8 hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-blue-600">
                  Smart Departure Times
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  See exactly when to leave to avoid rush hour. Schedule routes
                  and get notifications when it's time to go.
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-border p-8 hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Route className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-blue-600">
                  Saved Routes
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Save your daily commute and frequent trips. One tap to start
                  navigating your optimized routes.
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-border p-8 hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-blue-600">
                  Crowd-sourced Data
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join 250,000+ users sharing real-time road conditions. The
                  more people use it, the smarter it gets.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-blue-700">
              What our users say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands who've transformed their daily commute
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Daily Commuter",
                content:
                  "This app literally changed my life. I get home 40 minutes earlier every day. That's time I can spend with my kids instead of sitting in traffic.",
              },
              {
                name: "Michael Chen",
                role: "Delivery Driver",
                content:
                  "I make 20% more deliveries per day now. The multi-stop optimization is incredibly accurate. Best tool I've ever used for my business.",
              },
              {
                name: "Emily Rodriguez",
                role: "Sales Executive",
                content:
                  "I used to be late to client meetings all the time. Now I arrive early and relaxed. The predictive traffic analysis is spot-on every time.",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border border-border p-8">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-12 text-center">
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                  Start saving time today
                </h2>
                <p className="text-xl text-muted-foreground mx-auto max-w-2xl text-pretty">
                  Join 250,000+ drivers who've already discovered the smarter
                  way to navigate. Free forever, no credit card required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-base h-12 px-8" asChild>
                  <Link to="/signup">
                    Get started for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-12 px-8 bg-transparent"
                  asChild
                >
                  <Link to="/how-it-works">Learn more</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          </Card>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Navigation2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Traffic Route Optimizer</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

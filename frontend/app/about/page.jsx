import { Navbar } from "@//components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Route, Zap, TrendingDown, MapPin, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-blue-700">Smart Navigation Powered by AI</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Traffic Route Optimizer uses advanced machine learning and custom algorithms to find the fastest routes
              while avoiding traffic congestion in real-time.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">How It Works</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border border-blue-600">
                <CardContent className="pt-6">
                  <div className="h-12 border border-blue-600 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-600">AI Traffic Prediction</h3>
                  <p className="text-muted-foreground">
                    Our machine learning models analyze historical and real-time traffic data to predict congestion
                    patterns and optimize your route accordingly.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-blue-600">
                <CardContent className="pt-6">
                  <div className=" border border-blue-600 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Route className="h-6 w-6 text-primary " />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-600">Custom Algorithms</h3>
                  <p className="text-muted-foreground">
                    Advanced shortest-path algorithms calculate optimal routes across multiple stops, considering
                    distance, time, and traffic conditions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-blue-600">
                <CardContent className=" pt-6">
                  <div className="border border-blue-600 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-600">Real-Time Rerouting</h3>
                  <p className="text-muted-foreground">
                    When you deviate from the planned route or traffic conditions change, the system automatically
                    recalculates the optimal path.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted/30 py-16 px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Why Choose Our Platform</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-blue-600">Save Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduce your travel time by up to 30% with intelligent route optimization
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-blue-600">Avoid Traffic</h3>
                  <p className="text-sm text-muted-foreground">
                    Predict and navigate around congestion before you encounter it
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-blue-600">Multiple Stops</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimize complex routes with unlimited waypoints and destinations
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Route className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-blue-600">Save & Reuse</h3>
                  <p className="text-sm text-muted-foreground">
                    Store frequently used routes for instant access anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

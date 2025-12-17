import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">How It Works</h1>
          <p className="text-lg text-muted-foreground text-center mb-12 text-pretty">
            Our platform combines cutting-edge technology to deliver the smartest routes
          </p>

          <div className="space-y-8">
            {/* Step 1 */}
            <Card className="border border-blue-600">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 ">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">Enter Your Destinations</h3>
                    <p className="text-muted-foreground">
                      Add your starting point, destination, and any stops along the way. Our intuitive interface makes
                      it easy to plan complex multi-stop routes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border border-blue-600">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">AI Analyzes Traffic Patterns</h3>
                    <p className="text-muted-foreground">
                      Our machine learning models process millions of data points including historical traffic patterns,
                      current conditions, time of day, and even weather to predict the optimal route.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border border-blue-600">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">Route Optimization</h3>
                    <p className="text-muted-foreground">
                      Custom algorithms calculate the fastest path by comparing multiple route options, optimizing stop
                      order, and balancing distance with predicted travel time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border border-blue-600">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">Real-Time Navigation</h3>
                    <p className="text-muted-foreground">
                      Follow turn-by-turn directions with live traffic updates. If conditions change or you deviate from
                      the route, the system automatically recalculates to keep you on the fastest path.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="border border-blue-600">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">Save for Later</h3>
                    <p className="text-muted-foreground">
                      Frequently make the same trip? Save your optimized route and access it instantly next time.
                      Perfect for daily commutes, delivery routes, or regular errands.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technology Stack */}
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Technology Behind the Scenes</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className=" text-blue-600">Machine Learning:</strong>
                  <span className="text-muted-foreground ml-2">Traffic prediction and pattern recognition</span>
                </div>
                <div>
                  <strong className="text-blue-600">Graph Algorithms:</strong>
                  <span className="text-muted-foreground ml-2">Dijkstra's Algorithm for optimal route finding</span>
                </div>
                <div>
                  <strong className="text-blue-600">Real-Time Data:</strong>
                  <span className="text-muted-foreground ml-2">Live traffic feeds and updates</span>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

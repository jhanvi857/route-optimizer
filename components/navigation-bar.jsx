import { Card } from "@/components/ui/card"
import { Navigation, Clock, Route } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function NavigationBar({
  distanceTraveled = 5.2,
  distanceRemaining = 7.2,
  eta = "2:45 PM",
  isRerouting = false,
}) {
  const totalDistance = distanceTraveled + distanceRemaining
  const progressPercent = (distanceTraveled / totalDistance) * 100

  return (
    <Card className="fixed bottom-0 left-0 right-0 p-4 rounded-none border-x-0 border-b-0 bg-card/95 backdrop-blur shadow-lg">
      <div className="mx-auto max-w-7xl">
        <div className="mb-3">
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Route className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Traveled</div>
              <div className="text-sm font-semibold">{distanceTraveled} mi</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Navigation className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Remaining</div>
              <div className="text-sm font-semibold">{distanceRemaining} mi</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">ETA</div>
              <div className="text-sm font-semibold">{eta}</div>
            </div>
          </div>
        </div>

        {isRerouting && (
          <div className="flex items-center justify-center gap-2 p-2 bg-primary/10 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Re-optimizing route...</span>
          </div>
        )}
      </div>
    </Card>
  )
}
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, GripVertical, X, MapPin, Clock, Zap, TrendingDown } from "lucide-react"
import { cn } from "@//lib/utils"

export function RoutePlanner({ onOptimize }) {
  const [stops, setStops] = useState([
    { id: "1", label: "A", address: "" },
    { id: "2", label: "B", address: "" },
  ])
  const [departureTime, setDepartureTime] = useState("")
  const [routeMode, setRouteMode] = useState("traffic")

  const addStop = () => {
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const newLabel = labels[stops.length] || `${stops.length + 1}`
    setStops([...stops, { id: Date.now().toString(), label: newLabel, address: "" }])
  }

  const removeStop = (id) => {
    if (stops.length > 2) {
      setStops(stops.filter((stop) => stop.id !== id))
    }
  }

  const updateAddress = (id, address) => {
    setStops(stops.map((stop) => (stop.id === id ? { ...stop, address } : stop)))
  }

  return (
    <Card className="w-full h-full border-0 shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Plan Your Route</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Route Stops */}
        <div className="space-y-3">
          {stops.map((stop, index) => (
            <div key={stop.id} className="flex items-center gap-2 group">
              <button className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                <GripVertical className="h-5 w-5" />
              </button>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                {stop.label}
              </div>

              <Input
                placeholder={
                  index === 0 ? "Start location" : index === stops.length - 1 ? "Destination" : `Stop ${stop.label}`
                }
                value={stop.address}
                onChange={(e) => updateAddress(stop.id, e.target.value)}
                className="flex-1"
              />

              {stops.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStop(stop.id)}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addStop} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Stop
          </Button>
        </div>

        {/* Departure Time */}
        <div className="space-y-2">
          <Label htmlFor="departure" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Departure Time
          </Label>
          <Input
            id="departure"
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>

        {/* Route Mode */}
        <div className="space-y-2">
          <Label>Route Optimization</Label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setRouteMode("fastest")}
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border-2 transition-all",
                routeMode === "fastest" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
              )}
            >
              <Zap className={cn("h-5 w-5", routeMode === "fastest" ? "text-primary" : "text-muted-foreground")} />
              <div className="text-left">
                <div className="text-sm font-medium">Fastest</div>
                <div className="text-xs text-muted-foreground">Shortest time</div>
              </div>
            </button>

            <button
              onClick={() => setRouteMode("traffic")}
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border-2 transition-all",
                routeMode === "traffic" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
              )}
            >
              <TrendingDown
                className={cn("h-5 w-5", routeMode === "traffic" ? "text-primary" : "text-muted-foreground")}
              />
              <div className="text-left">
                <div className="text-sm font-medium">Least Traffic</div>
                <div className="text-xs text-muted-foreground">Avoid congestion</div>
              </div>
            </button>
          </div>
        </div>

        {/* Optimize Button */}
        <Button size="lg" className="w-full" onClick={onOptimize}>
          <MapPin className="h-5 w-5 mr-2" />
          Optimize Route
        </Button>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ZoomIn, ZoomOut, Compass, Layers, Save } from "lucide-react"

export function MapView({ onSave }) {
  const [trafficVisible, setTrafficVisible] = useState(true)
  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Map view loads here</p>
          <p className="text-xs text-muted-foreground">Enter locations to see route visualization</p>
        </div>
      </div>

      {/* Map Controls - Right Side */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <Card className="p-1">
          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="h-px bg-border my-1" />
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Compass className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Button
          variant={trafficVisible ? "default" : "secondary"}
          size="sm"
          onClick={() => setTrafficVisible(!trafficVisible)}
          className="gap-2"
        >
          <Layers className="h-4 w-4" />
          Traffic
        </Button>
      </div>

      {/* Save Route Button - Top Right */}
      <div className="absolute top-4 left-4">
        <Button variant="secondary" size="sm" onClick={onSave} className="gap-2 shadow-md">
          <Save className="h-4 w-4" />
          Save Route
        </Button>
      </div>

      {/* Route Info Card - Bottom */}
      <Card className="absolute bottom-4 left-4 right-4 p-4 bg-card/95 backdrop-blur">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-muted-foreground">Distance</div>
            <div className="text-lg font-semibold">12.4 mi</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Duration</div>
            <div className="text-lg font-semibold">24 min</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Traffic</div>
            <div className="text-lg font-semibold text-green-600">Light</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

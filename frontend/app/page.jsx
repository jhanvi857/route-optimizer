import { useState } from "react"
import axios from "axios"
import { Navbar } from "@//components/navbar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import MapView from "../src/MapView"
import {Link, useNavigate} from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
export default function HomePage() {
  // const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000"
  const API_BASE = "http://localhost:5000"

  const [locations, setLocations] = useState(["", ""])
  const [routeCoords, setRouteCoords] = useState([])
  const [markerCoords, setMarkerCoords] = useState([])
  const [isNavigating, setIsNavigating] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [routeName, setRouteName] = useState("")
  const [totalDistance, setTotalDistance] = useState(0)
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("userEmail"));
  const {toast} = useToast();
  const updateLocation = (index, value) => {
    const updated = [...locations]
    updated[index] = value
    setLocations(updated)
  }

  const addStop = () => {
    setLocations([...locations.slice(0, -1), "", locations[locations.length - 1]])
  }

  const removeStop = (index) => {
    if (locations.length <= 2) return
    setLocations(locations.filter((_, i) => i !== index))
  }

  const calculateDistance = (coords) => {
    if (coords.length < 2) return 0
    let dist = 0
    for (let i = 1; i < coords.length; i++) {
      const [lat1, lon1] = coords[i - 1]
      const [lat2, lon2] = coords[i]
      const R = 6371e3
      const φ1 = (lat1 * Math.PI) / 180
      const φ2 = (lat2 * Math.PI) / 180
      const Δφ = ((lat2 - lat1) * Math.PI) / 180
      const Δλ = ((lon2 - lon1) * Math.PI) / 180
      const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      dist += R * c
    }
    return dist / 1000
  }

  const handleOptimize = async () => {
    try {
      setRouteCoords([])
      setMarkerCoords([])
      const coords = []
      for (let loc of locations) {
        const res = await axios.post(`${API_BASE}/api/geocode`, { location: loc })
        const [lng, lat] = res.data.features[0].geometry.coordinates
        coords.push({ lat, lng })
      }
      setMarkerCoords(coords)

      let fullRoute = []
      for (let i = 0; i < coords.length - 1; i++) {
        const res = await axios.post(`${API_BASE}/api/get-route`, {
          start: coords[i],
          end: coords[i + 1],
        })
        const segment = res.data.coordinates.map(([lng, lat]) => [lat, lng])
        fullRoute.push(...segment)
      }
      setRouteCoords(fullRoute)
      const dist = calculateDistance(fullRoute)
      setTotalDistance(dist.toFixed(2))
      setIsNavigating(true)
    } catch (err) {
      console.error("Route error:", err)
    }
  }

  const handleSaveRoute = () => {
    const userEmail = localStorage.getItem("userEmail")
  
    if (!userEmail || userEmail === "null") {
      toast({
        title: "Login required",
        description: "Saving routes is available only for logged-in users. Please login or sign up to use this feature.",
        variant: "destructive", 
      })
      return
    }
    navigate("/addRoute");
  //  setSaveDialogOpen(true)
  }
  

  return (
    <div className="flex flex-col h-screen">
        <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <aside className="w-full md:w-96 border-r border-border overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Route Planner</h2>
          <p className="text-sm text-muted-foreground mb-4">Add multiple stops and find the best route.</p>

          <div className="space-y-4">
            {locations.map((loc, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={loc}
                  placeholder={index === 0 ? "Start location" : index === locations.length - 1 ? "End location" : `Stop ${index}`}
                  onChange={(e) => updateLocation(index, e.target.value)}
                />
                {index !== 0 && index !== locations.length - 1 && (
                  <Button variant="outline" onClick={() => removeStop(index)}>✕</Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-4 w-full" onClick={addStop}>
            + Add Stop
          </Button>

          <Button className="mt-4 w-full" onClick={handleOptimize}>
            Optimize Route
          </Button>

          <Button variant="secondary" className="mt-2 w-full text-black" onClick={handleSaveRoute}>
            Save Route
          </Button>

          {isNavigating && routeCoords.length > 1 && (
            <div className="mt-4 text-sm">
              🛣️ Total Distance: <strong>{totalDistance} km</strong>
            </div>
          )}
        </aside>

        {/* Map Panel */}
        <main className="flex-1 z-0">
          <MapView
            routeCoords={routeCoords}
            markerCoords={markerCoords}
          />
        </main>
      </div>

      {/* Save Route Dialog */}
      {/* <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen} className="relative z-[9999]">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Route</DialogTitle>
            <DialogDescription>Give your route a name so you can easily find it later.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="route-name">Route Name</Label>
              <Input
                id="route-name"
                placeholder="e.g., Daily Commute, Weekend Errands"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Link to="/addRoute">Save Route</Link>
          </div>
        </DialogContent>
      </Dialog>  */}
    </div>
  )
}
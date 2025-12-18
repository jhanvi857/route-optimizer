// "use client"

// import { Navbar } from "../../components/navbar"
// import { Button } from "../../components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
// import { MapPin, Clock, Trash2, Play, Route } from "lucide-react"

// const savedRoutes = [
//   {
//     id: 1,
//     name: "Daily Commute",
//     distance: "12.4 mi",
//     duration: "24 min",
//     stops: 2,
//     lastUsed: "2 hours ago",
//   },
//   {
//     id: 2,
//     name: "Weekend Errands",
//     distance: "18.7 mi",
//     duration: "42 min",
//     stops: 5,
//     lastUsed: "3 days ago",
//   },
//   {
//     id: 3,
//     name: "Airport Route",
//     distance: "28.3 mi",
//     duration: "35 min",
//     stops: 2,
//     lastUsed: "1 week ago",
//   },
// ]

// export default function SavedRoutesPage() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-8 bg-muted/30">
//         <div className="mx-auto max-w-4xl">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">Saved Routes</h1>
//             <p className="text-muted-foreground">Quickly access your frequently used routes</p>
//           </div>

//           {savedRoutes.length === 0 ? (
//             <Card className="py-12">
//               <CardContent className="text-center space-y-4">
//                 <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
//                   <MapPin className="h-8 w-8 text-muted-foreground" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold mb-1">No saved routes yet</h3>
//                   <p className="text-sm text-muted-foreground">Save your favorite routes for quick access later</p>
//                 </div>
//                 <Button>Create Your First Route</Button>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="space-y-4">
//               {savedRoutes.map((route) => (
//                 <Card key={route.id} className="hover:shadow-md transition-shadow">
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <CardTitle className="text-xl">{route.name}</CardTitle>
//                         <CardDescription className="mt-1">Last used {route.lastUsed}</CardDescription>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button size="sm">
//                           <Play className="h-4 w-4 mr-2" />
//                           Start
//                         </Button>
//                         <Button size="sm" variant="ghost">
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-3 gap-4">
//                       <div className="flex items-center gap-2">
//                         <MapPin className="h-4 w-4 text-muted-foreground" />
//                         <div>
//                           <div className="text-xs text-muted-foreground">Distance</div>
//                           <div className="font-semibold">{route.distance}</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Clock className="h-4 w-4 text-muted-foreground" />
//                         <div>
//                           <div className="text-xs text-muted-foreground">Duration</div>
//                           <div className="font-semibold">{route.duration}</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Route className="h-4 w-4 text-muted-foreground" />
//                         <div>
//                           <div className="text-xs text-muted-foreground">Stops</div>
//                           <div className="font-semibold">{route.stops}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }
import { Navbar } from "@//components/navbar"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Pencil, Trash2, MapPin, Clock, Route } from "lucide-react"

export default function SavedRoutes() {
  const navigate = useNavigate()
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const API_BASE = import.meta.env.VITE_API_URL

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this route?")
    if (!confirmDelete) return

    try {
      const res = await fetch(`${API_BASE}/api/routes/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setRoutes((prev) => prev.filter((route) => route._id !== id))
      }
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail || userEmail === "null") {
      setLoading(false)
      return
    }

    const fetchRoutes = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/routes/${userEmail}`)
        const data = await res.json()
        setRoutes(data.reverse())
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  if (loading) {
    return (
      <p className="text-center mt-10 text-sm text-muted-foreground">
        Loading saved routes…
      </p>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-muted/30 px-4 md:px-10 py-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-700">Saved Routes</h1>
            <p className="text-muted-foreground">
              Quickly access your frequently used routes
            </p>
          </div>

          {/* Empty State */}
          {routes.length === 0 ? (
            <div className="border border-blue-300 rounded-xl p-10 text-center text-muted-foreground">
              No saved routes found. Login or Signup to use this feature.
            </div>
          ) : (
            <div className="space-y-4">
              {routes.map((route) => (
                <div
                  key={route._id}
                  className="border border-blue-300 rounded-xl p-5 bg-white hover:shadow-md transition"
                >
                  {/* Title + Actions */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-600">{route.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        From {route.start} to {route.end}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate("/addRoute", { state: { editRoute: route } })
                        }
                        className="p-2 border border-blue-300 rounded-md hover:bg-muted"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(route._id)}
                        className="p-2 border border-blue-300 rounded-md hover:bg-muted"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Route Meta */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">{route.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Route className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">{route.mode}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground">
                    Saved on: {route.savedAt}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Add New Route */}
          <Link to="/addRoute">
            <div className="mt-10 border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:bg-muted transition">
              <div className="text-4xl font-bold text-blue-600">+</div>
              <p className="mt-2 text-sm text-blue-600">Add New Route</p>
            </div>
          </Link>

        </div>
      </main>
    </>
  )
}

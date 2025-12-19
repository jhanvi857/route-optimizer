from fastapi import APIRouter,HTTPException
import httpx
import os
from dotenv import load_dotenv
from utils.graph_builder import graph_builder
from utils.dijkstra import dijkstra

load_dotenv()
router = APIRouter()
API_KEY = os.getenv("API_KEY")
@router.post("/geocode")
async def geocode(payload: dict):
    try:
        location = payload.get("location")
        if not location:
            raise HTTPException(status_code=400, detail="Location is required")

        async with httpx.AsyncClient() as client:
            geo_res = await client.get(
                "https://api.openrouteservice.org/geocode/search",
                params={
                    "api_key": API_KEY,
                    "text": location
                }
            )

        return geo_res.json()

    except Exception as err:
        print("Error in /geocode:", err)
        raise HTTPException(status_code=500, detail="Geocoding failed")
@router.post("/get-route")
async def get_route(payload: dict):
    try:
        start = payload.get("start")
        end = payload.get("end")
        traffic_data = payload.get("trafficData")

        if not start or not end:
            raise HTTPException(
                status_code=400,
                detail="Start or end location is missing"
            )

        async with httpx.AsyncClient() as client:
            route_res = await client.post(
                "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
                json={
                    "coordinates": [
                        [start["lng"], start["lat"]],
                        [end["lng"], end["lat"]]
                    ]
                },
                headers={
                    "Authorization": API_KEY,
                    "Content-Type": "application/json"
                }
            )

        coords = route_res.json()["features"][0]["geometry"]["coordinates"]

        graph = graph_builder(coords, traffic_data)

        start_key = ",".join(map(str, coords[0]))
        end_key = ",".join(map(str, coords[-1]))

        dist, prev = dijkstra(graph, start_key)
        path_keys = reconstruct_path(prev, start_key, end_key)

        optimized_coords = [
            list(map(float, k.split(",")))
            for k in path_keys
        ]

        return {
            "distance": dist[end_key],
            "coordinates": optimized_coords
        }

    except Exception as err:
        print("Error in /get-route (Dijkstra):", err)
        raise HTTPException(
            status_code=500,
            detail="Custom Dijkstra route fetch failed"
        )

def reconstruct_path(prev, start, end):
    path = []
    curr = end

    while curr:
        path.insert(0, curr)
        if curr == start:
            break
        curr = prev.get(curr)

    return path

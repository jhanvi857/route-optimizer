from fastapi import APIRouter, HTTPException
from database import route_collection
from bson import ObjectId

router = APIRouter()


# POST /api/routes
@router.post("/")
async def save_route(payload: dict):
    try:
        new_route = {
            "title": payload.get("title"),
            "start": payload.get("start"),
            "end": payload.get("end"),
            "distance": payload.get("distance"),
            "duration": payload.get("duration"),
            "mode": payload.get("mode"),
            "userEmail": payload.get("userEmail")
        }

        result = await route_collection.insert_one(new_route)
        new_route["_id"] = str(result.inserted_id)

        return new_route

    except Exception as err:
        print("Error saving route:", err)
        raise HTTPException(status_code=500, detail="Error saving route")

@router.get("/{email}")
async def get_routes(email: str):
    print("recieved GET req from user", email)

    try:
        routes = []
        async for route in route_collection.find({"userEmail": email}):
            route["_id"] = str(route["_id"])
            routes.append(route)

        print("fetching data for..", routes)
        return routes

    except Exception as err:
        print("Error in GET /api/routes/:email", err)
        raise HTTPException(status_code=500, detail="Error fetching routes")

@router.put("/{id}")
async def update_route(id: str, payload: dict):
    try:
        updated = await route_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": payload},
            return_document=True
        )

        if updated:
            updated["_id"] = str(updated["_id"])
            return updated

        raise HTTPException(status_code=404, detail="Route not found")

    except Exception as err:
        print("Error in updating route", err)
        raise HTTPException(status_code=500, detail="Error updating route")

@router.delete("/{id}")
async def delete_route(id: str):
    try:
        await route_collection.delete_one({"_id": ObjectId(id)})
        return {"msg": "Route deleted successfully"}

    except Exception as err:
        print("Error deleting route:", err)
        raise HTTPException(status_code=500, detail="Error deleting route")

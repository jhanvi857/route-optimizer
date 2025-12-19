from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router
from routes.route_routes import router as route_router
import api_process as geocode
from routers import router as get_route
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://route-optimizer-one.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(route_router, prefix="/api/routes")
app.include_router(geocode.router, prefix="/api/geocode")
app.include_router(get_route,prefix="/api")

@app.get("/")
def root():
    return {"msg": "Backend running with FastAPI"}

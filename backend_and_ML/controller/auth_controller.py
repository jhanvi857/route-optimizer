from fastapi import APIRouter, HTTPException, status
from database import user_collection
from fastapi import HTTPException
import bcrypt

router = APIRouter()


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def sign_up(payload: dict):
    try:
        name = payload.get("name")
        email = payload.get("email")
        password = payload.get("password")

        exist_user = await user_collection.find_one({"email": email})
        if exist_user:
            return {"msg": "User already exists"}

        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(10))

        user = {
            "name": name,
            "email": email,
            "password": hashed_password
        }

        result = await user_collection.insert_one(user)
        user["_id"] = str(result.inserted_id)

        print("User saved:", user)

        return {
            "user": {
                "name": name,
                "email": email
            }
        }

    except Exception as err:
        print("Signup Error:", str(err))
        raise HTTPException(
            status_code=500,
            detail="Server error"
        )


@router.post("/login")
async def log_in(payload: dict):
    email = payload.get("email")
    password = payload.get("password")

    print("Incoming login:", email)

    user = await user_collection.find_one({"email": email})
    if not user:
        print("No user found for email:", email)
        raise HTTPException(status_code=400, detail="Invalid email")

    is_match = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    )

    if not is_match:
        print("Invalid password for:", email)
        raise HTTPException(status_code=400, detail="Invalid password")

    return {
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    }
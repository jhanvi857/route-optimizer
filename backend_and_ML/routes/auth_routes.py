from fastapi import APIRouter
from controller.auth_controller import sign_up, log_in

router = APIRouter()

router.add_api_route("/signup", sign_up, methods=["POST"])
router.add_api_route("/login", log_in, methods=["POST"])

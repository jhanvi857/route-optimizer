from pydantic import BaseModel
from datetime import datetime

class SavedRoute(BaseModel):
    title: str
    start: str
    end: str
    distance: str
    duration: str
    mode: str
    userEmail: str
    savedAt: str = datetime.now().strftime("%d/%m/%Y")

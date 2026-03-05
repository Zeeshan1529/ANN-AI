from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Feedback
from sqlalchemy import desc

router = APIRouter(prefix="/feedback", tags=["Feedback"])

@router.post("/")
def submit_feedback(data: dict, db: Session = Depends(get_db)):
    
    feedback = Feedback(
        rating=data.get("rating"),
        tags=",".join(data.get("tags", [])),
        comment=data.get("comment")
    )

    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    return {"status": "saved", "id": feedback.id}

@router.get("/latest")
def latest_feedback(db: Session = Depends(get_db)):
    try:
        row = db.query(Feedback).order_by(Feedback.id.desc()).first()
    except Exception as e:
        return {"error": str(e)}

    if not row:
        return {"data": None}

    return {
        "data": {
            "id": getattr(row, "id", None),
            "rating": getattr(row, "rating", None),
            "tags": getattr(row, "tags", None),
            "comment": getattr(row, "comment", None),
            "created_at": getattr(row, "created_at", None)
        }
    }
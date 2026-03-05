from fastapi import APIRouter

router = APIRouter()

@router.get("/analytics/crowd")
def crowd():
    return {
        "current_load": 0.63,
        "best_time": "20:10",
        "peak_time": "19:45",
        "series": [
            {"t": "19:30", "v": 0.35},
            {"t": "19:45", "v": 0.92},
            {"t": "20:00", "v": 0.60},
            {"t": "20:15", "v": 0.30},
        ],
    }

@router.get("/nutrition/student")
def nutrition():
    return {
        "score": 82,
        "protein": 78,
        "carbs": 90,
        "vegetables": 55,
        "recommendation": "Add salad tonight",
    }

@router.get("/leaderboard")
def leaderboard():
    return [
        {"name": "Arjun", "points": 420},
        {"name": "Kavya", "points": 398},
        {"name": "Rahul", "points": 365},
        {"name": "You", "points": 340},
    ]
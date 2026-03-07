from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os

router = APIRouter(prefix="/ai", tags=["AI"])

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "model")

model = joblib.load(os.path.join(MODEL_DIR, "demand_model.pkl"))
day_encoder = joblib.load(os.path.join(MODEL_DIR, "day_encoder.pkl"))
meal_encoder = joblib.load(os.path.join(MODEL_DIR, "meal_encoder.pkl"))


class DemandPredictionInput(BaseModel):
    day: str
    meal_type: str
    prev_attendance: int
    avg_rating: float
    complaint_count: int
    previous_waste_kg: float
    is_weekend: int
    is_special_day: int


@router.post("/predict-demand")
def predict_demand(data: DemandPredictionInput):
    try:
        day_encoded = day_encoder.transform([data.day])[0]
        meal_encoded = meal_encoder.transform([data.meal_type])[0]

        input_df = pd.DataFrame([{
            "day": day_encoded,
            "meal_type": meal_encoded,
            "prev_attendance": data.prev_attendance,
            "avg_rating": data.avg_rating,
            "complaint_count": data.complaint_count,
            "previous_waste_kg": data.previous_waste_kg,
            "is_weekend": data.is_weekend,
            "is_special_day": data.is_special_day,
        }])

        prediction = int(round(model.predict(input_df)[0]))

        if prediction < 120:
            crowd_level = "low"
        elif prediction < 170:
            crowd_level = "medium"
        else:
            crowd_level = "high"

        suggested_preparation_index = round(prediction / 200, 2)

        return {
            "predicted_attendance": prediction,
            "crowd_level": crowd_level,
            "suggested_preparation_index": suggested_preparation_index,
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Encoding error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.get("/admin-summary")
def get_admin_summary():
    return {
        "top_issue": "Too Salty",
        "sentiment_trend": "Negative feedback increased by 12% this week",
        "waste_risk": "Medium",
        "recommendation": "Reduce salt level in lunch meals and monitor waste for the next 2 serving cycles.",
    }
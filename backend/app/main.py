from fastapi import FastAPI
from .database import Base, engine
from .routers import user
from fastapi.middleware.cors import CORSMiddleware
from .routers import analytics
from .routers import feedback

# Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user.router)
app.include_router(analytics.router)
app.include_router(feedback.router)

@app.get("/")
def root():
    return {"message": "API Running"}
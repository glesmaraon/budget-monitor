from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message":"AI Financial Companion API"}

@app.get("/health")
def health():
    return {"status":"online"}

@app.get("/summary")
def summary():
    return {
        "expenses":100,
        "savings":1500,
        "loans":250
    }

@app.get("/forecast")
def forecast():
    return {
        "recommendation":"Save £30 this week",
        "protection":"ACTIVE"
    }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI(title="Budget Monitor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

expenses=[]

@app.get("/health")
def health():
    return {"status":"online"}

@app.post("/expense")
def add_expense(data:dict):
    expenses.append(data)
    return {"saved":True}

@app.get("/summary")
def summary():
    total=sum(x.get("amount",0) for x in expenses)
    return {"total_spent":total,"count":len(expenses)}

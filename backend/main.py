from fastapi import FastAPI
app=FastAPI()
@app.get("/prediction")
def prediction():
 return {"predicted_savings":"£260/month","time":"30 days","confidence":"78%","reality":"70%"}
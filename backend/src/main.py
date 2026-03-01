from fastapi import FastAPI
from .database import engine, Base
from . import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="pizzaria")

@app.get("/")
def read_root():
    return {"status": "Online", "msg": "pizzaria online"}
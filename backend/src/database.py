import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

USER = os.getenv("DB_USER")
PASS = os.getenv("DB_PW")
HOST = os.getenv("DB_HOST")
PORT = os.getenv("DB_PORT")
NAME = os.getenv("DB_NAME")

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{USER}:{PASS}@{HOST}:{PORT}/{NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # CLASSE DA SESSAO.
Base = declarative_base()

def get_db():
    db = SessionLocal() # DECLARACAO DA INSTANCIA DA CLASSE QUE INICIA UMA SESSAO REAL.
    try:
        yield db # RODANDO A INSTANCIA.
    finally:
        db.close() # FECHANDO A SESSAO QUANDO TERMINAR, INDEPENDENTE DE ERROS.
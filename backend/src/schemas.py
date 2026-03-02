from pydantic import BaseModel

# schemas serve pra "validar" os tipos d dados antes de seguirem pro CRUD. 
# caso haja inconsistencia, ja da erro antes mesmo de passar pro CRUD
# se nao houverem erros, o CRUD já faz o trabalho de traduzir e adicionar no banco.

# table products schema
class ProductCreate(BaseModel):
    name: str
    description: str
    category: str
    price: float

#
class Product(ProductCreate):
    id: int

    class Config:
        from_attributes = True # pydantic ler os dados do sqlalchemy


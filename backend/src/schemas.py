from pydantic import BaseModel

# schemas serve pra "validar" os tipos d dados antes de seguirem pro CRUD. 
# caso haja inconsistencia, ja da erro antes mesmo de passar pro CRUD
# se nao houverem erros, o CRUD já faz o trabalho de traduzir e adicionar no banco.

class OrderCreate(BaseModel):
    employee_id: int
    customer_id: int
    delivery_driver_id: int
    is_delivery: bool
    payment_type: str
    address: str
    status: str

class Order(OrderCreate):
    id: int

    class Config:
        from_attributes = True

class OrderItemCreate(BaseModel):
    order_id: int
    product_id: int
    quantity: int
    unit_price: float

class OrderItem(OrderItemCreate):
    id: int

    class Config:
        from_attributes = True

class CustomerCreate(BaseModel):
    name: str
    address: str
    phone_number: str

class Customer(CustomerCreate):
    id: int

    class Config:
        from_attributes = True

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

class EmployeeCreate(BaseModel):
    address: str
    phone_number: str
    email: str
    role: str
    name: str

class Employee(EmployeeCreate):
    id: int

    class Config:
        from_attributes = True

class DeliveryDriverCreate(BaseModel):
    name: str
    phone_number: str
    vehicle: str
    vehicle_plate: str

class DeliveryDriver(DeliveryDriverCreate):
    id: int

    class Config:
        from_attributes = True
from sqlalchemy import Column, Integer, String, Float, Text, Boolean, Numeric, ForeignKey # aqui importamos os tipos de variaveis p serem declarados
from .database import Base # classe do declarative_base() do modulo database, isso que manda tudo lá pro sql se virar

# models serve justamente pra modelar as tabelas do nosso banco de dados
# ah, mas pq nao fazer via SQL direto? 
# segurança, manutençao, escalabilidade, etc.
# com o models pré-definido, a estrutura do banco está aqui.
# qualquer mudança, o banco se ajustará, se isso fosse feito via sql puro,
# o código quebraria.
# no sql puro, teria que reescrever toda a tabela pq é diferente, pra mudar de banco.
# usando models, se quiser mudar pra um postgre da vida, é só alterar a url do database.py
# proteçao contra sql injection automaticamente. o models trata os dados e tira o "perigo".


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    customer_id = Column(Integer, ForeignKey("customers.id"))
    delivery_driver_id = Column(Integer, ForeignKey("delivery_drivers.id"), nullable=True)
    is_delivery = Column(Boolean, default=False)
    payment_type = Column(String(50), nullable=False)
    address = Column(String(120), nullable=True)
    status = Column(String(30), nullable=False)

class OrderItem(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    address = Column(String(120), nullable=False)
    phone_number = Column(String(20), nullable=False)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(20), nullable=False)
    price = Column(Numeric(10, 2), nullable=False)

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(120), nullable=False)
    phone_number = Column(String(20), nullable=False)
    email = Column(String(50), nullable=False)
    role = Column(String(50), nullable=False)
    name = Column(String(100), nullable=False)

class DeliveryDriver(Base):
    __tablename__ = "delivery_drivers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone_number = Column(String(20), nullable=False)
    vehicle = Column(String(50), nullable=False)
    vehicle_plate = Column(String(10), nullable=False)

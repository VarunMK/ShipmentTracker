DROP TABLE IF EXISTS Client, OrderHistory, Vehicles, Orders, Delivery_Staff, Partners, employee, warehouse,partner_orders CASCADE;
DROP TYPE IF EXISTS details_type CASCADE;

drop database shipment;
create database shipment;


CREATE TABLE Client(
    Client_ID varchar(10),
    password varchar,
    name VARCHAR NOT NULL,
    ph_num varchar(10),
    email varchar,
    addr varchar,
    PRIMARY KEY(Client_ID));

CREATE TABLE Delivery_Staff(
    DS_id VARCHAR NOT NULL, 
    Name VARCHAR,
    reg_num VARCHAR NOT NULL,
    Start_date DATE default CURRENT_DATE, -- CURRENT_DATE
    Salary INT NOT NULL,
    ph_num varchar(10),
    email varchar,
    addr varchar,
    PRIMARY KEY(DS_id));

CREATE TABLE Partners(
    Partner_id VARCHAR, 
    Products VARCHAR,
    PRIMARY KEY(Partner_id));

CREATE TABLE warehouse(
    W_id VARCHAR, 
    VehicleQuantity int CHECK (VehicleQuantity > 0),
    wlocation varchar,
    Partner_ID VARCHAR,
    primary key(W_id),
    FOREIGN KEY (Partner_ID) REFERENCES Partners(Partner_id));

CREATE TABLE Vehicles(
    Vehicle_id VARCHAR, 
    vehicle_load DECIMAL CHECK (vehicle_load > 100),
    reg_number VARCHAR,
    free BOOLEAN,
    W_id VARCHAR,
    DS_id VARCHAR, 
    PRIMARY KEY(Vehicle_ID), 
    FOREIGN KEY (W_id) REFERENCES Warehouse(W_id), 
    FOREIGN KEY (DS_id) REFERENCES Delivery_Staff(DS_id));

CREATE TABLE Orders(
    Prod_id serial, 
    arrival_date DATE,
    fragile BOOLEAN,
    prod_weight DECIMAL CHECK (prod_weight > 0),
    status VARCHAR(30),
    rec_add VARCHAR,
    reciever VARCHAR(20),
    Sender VARCHAR(20),
    Vehicle_id VARCHAR,
    Client_ID VARCHAR(10),
    DS_id VARCHAR,
    W_id VARCHAR,
    PRIMARY KEY(Prod_id),
    FOREIGN KEY (Vehicle_id) REFERENCES Vehicles(Vehicle_id),
    FOREIGN KEY (Client_ID) REFERENCES Client(Client_ID),
    FOREIGN KEY (DS_id) REFERENCES Delivery_Staff(DS_id),
    FOREIGN KEY (W_id) REFERENCES Warehouse(W_id));

CREATE TABLE Partner_orders(
    Prod_id int,
    Partner_id VARCHAR,
    PRIMARY KEY(Prod_id),
    FOREIGN KEY (Partner_id) REFERENCES Partners(Partner_id),
    FOREIGN KEY (Prod_id) REFERENCES Orders(Prod_id));

CREATE TABLE OrderHistory(
    delivered_date DATE CHECK (delivered_date <= CURRENT_DATE),
    prod_weight DECIMAL,
    rec_add VARCHAR(80),
    Client_ID VARCHAR,
    DS_id VARCHAR,
    Prod_id int,
    FOREIGN KEY (Client_ID) REFERENCES Client(Client_ID),
    FOREIGN KEY (DS_id) REFERENCES Delivery_Staff(DS_id),
    FOREIGN KEY (Prod_id) REFERENCES Orders(Prod_id));

CREATE TABLE employee(
    E_id SERIAL,
    eName VARCHAR NOT NULL,
    emp_ph_num varchar(10),
    emp_email varchar,
    emp_addr varchar,
    salary decimal NOT NULL,
    startDate DATE default CURRENT_DATE, -- CURRENT_DATE
    NumYears INT CHECK (NumYears >= 1),
    position VARCHAR NOT NULL,
    W_id VARCHAR,
    PRIMARY KEY(E_id),
    FOREIGN KEY (W_id) REFERENCES Warehouse(W_id));



CREATE OR REPLACE FUNCTION assign_del_staff() 
RETURNS TRIGGER LANGUAGE PLPGSQL AS 
$$ 
    BEGIN
        update vehicles set free='F' where vehicles.DS_id=NEW.ds_id;
    return NEW;
    END;
$$;

CREATE TRIGGER "assign delivery staff"
after insert on orders
for each row
execute procedure assign_del_staff(); 


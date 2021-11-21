DROP TABLE IF EXISTS Client, OrderHistory, Vehicles, Orders, Delivery_Staff, Partners, employee, warehouse,partner_orders CASCADE;
DROP TYPE IF EXISTS details_type CASCADE;


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
    Start_date DATE,
    Salary INT NOT NULL,
    PRIMARY KEY(DS_id),
    ph_num varchar(10),
    email varchar,
    addr varchar
);

CREATE TABLE Partners(
    Partner_id VARCHAR,
    Products VARCHAR,
    PRIMARY KEY(Partner_id)
);

CREATE TABLE warehouse(
    W_id VARCHAR,
    VehicleQuantity int,
    wlocation varchar,
    primary key(W_id),
    Partner_ID VARCHAR,
    FOREIGN KEY (Partner_ID) REFERENCES Partners(Partner_id)
);

CREATE TABLE Vehicles(
    Vehicle_id VARCHAR,
        vehicle_load DECIMAL,
    reg_number VARCHAR,
    free BOOLEAN,
    PRIMARY KEY(Vehicle_ID), 
    W_id VARCHAR,
    DS_id VARCHAR, 
    FOREIGN KEY (W_id) REFERENCES Warehouse(W_id), 
    FOREIGN KEY (DS_id) REFERENCES Delivery_Staff(DS_id));

CREATE TABLE Orders(
    Prod_id VARCHAR,
    arrival_date DATE,
    fragile BOOLEAN,
    prod_weight DECIMAL,
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
    FOREIGN KEY (W_id) REFERENCES Warehouse(W_id)
);
CREATE TABLE Partner_orders(
    Prod_id VARCHAR,
    Partner_id VARCHAR,
    PRIMARY KEY(Prod_id),
    FOREIGN KEY (Partner_id) REFERENCES Partners(Partner_id),
    FOREIGN KEY (Prod_id) REFERENCES Orders(Prod_id)
);


CREATE TABLE OrderHistory(
    delivered_date DATE,
    prod_weight DECIMAL,
    rec_add VARCHAR(80),Client_ID VARCHAR,
    DS_id VARCHAR,
    Prod_id VARCHAR,
    FOREIGN KEY (Client_ID) REFERENCES Client(Client_ID),
    FOREIGN KEY (DS_id) REFERENCES Delivery_Staff(DS_id),
    FOREIGN KEY (Prod_id) REFERENCES Orders(Prod_id));


CREATE TABLE employee(
    E_id INT,
    eName VARCHAR NOT NULL,
    emp_ph_num varchar(10),
    emp_email varchar,
    emp_addr varchar,
    salary decimal NOT NULL,
    PRIMARY KEY(E_id),
    startDate DATE,
    NumYears INT,
    position VARCHAR NOT NULL,
    W_id VARCHAR,
    FOREIGN KEY (W_id) REFERENCES Warehouse(W_id)
);

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


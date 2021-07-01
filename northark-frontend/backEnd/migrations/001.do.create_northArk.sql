/*
Sorry we didn't connect to dicsuss what to retain regarding tables and table contents. I went ahead and consolidated what I think would work. Please see bottom for commented tables. 
*/

CREATE TABLE accounts (
  account_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  date_opened DATE,
  balance FLOAT,
  available_balance FLOAT  /*,
  account_balance VARCHAR,
  account_type_id INT,
  customer_id INT
  */
);

INSERT INTO accounts ()
VALUES
  ()





CREATE TABLE transcations (
  transcations_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  date DATE,
  amount FLOAT,
  transcations_type_id INTEGER,
  account_id INTEGER
)

INSERT INTO transcations ()
VALUES
  ()





CREATE TABLE transcations_types (
  transcations_type_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  transcations_type_description VARCHAR
)

INSERT INTO transcations_types ()
VALUES
  ()





CREATE TABLE account_types (
  account_type_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  account_type_description VARCHAR
)

INSERT INTO account_types ()
VALUES
  ()





CREATE TABLE customers (
  customer_id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  customer_name VARCHAR,
  customer_phone INT,
  customer_email VARCHAR,
  password VARCHAR
)

INSERT INTO customers ()
VALUES
  ()



/*
CREATE TABLE accounts (
  account_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  account_name VARCHAR,
  account_phone INT,
  account_email VARCHAR,
  password VARCHAR,
  balance FLOAT,
  available_balance FLOAT
);

INSERT INTO accounts ()
VALUES
  ()



CREATE TABLE transcations (
  transcations_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  account_id INTEGER,
  date DATE,
  amount FLOAT,
  transcations_type_id INTEGER,
  transcations_type_description VARCHAR
)

INSERT INTO transcations ()
VALUES
  ()
*/

CREATE TABLE payment (
  transactionid UUID PRIMARY KEY,
  userid VARCHAR(255) NOT NULL,
  serviceid VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  paymentmethod VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  paymentdate TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE service (
  serviceid VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL
);
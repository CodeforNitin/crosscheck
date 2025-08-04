DROP TABLE IF EXISTS users;

CREATE TABLE users (
  emp_id INT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  FOREIGN KEY (emp_id) REFERENCES emprecords(id)
);

SELECT * FROM users;

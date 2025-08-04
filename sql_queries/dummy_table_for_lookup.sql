/*to create dummy database for lookup*/
DROP TABLE IF EXISTS emprecords;

CREATE TABLE emprecords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    email VARCHAR(100),
    Designation VARCHAR(100)
);

INSERT INTO emprecords (FirstName, LastName, email, Designation)
VALUES 
('Nitin', 'Jadhav', 'nitin.jadhav@xyz.com', 'CEO'),
('Manan', 'Kotak', 'manan.kotak@xyz.com', 'Supervisor'),
('Chaitnya', 'Pawar', 'chaitnya.pawar@xyz.com', 'Process Coordinator'),
('Debanik', 'Kundu', 'debanik.kundu@xyz.com', 'Planner');

ALTER TABLE employee_register CHANGE EmailID email VARCHAR(100);

SELECT * FROM emprecords;

/*to create dummy database for lookup*/
CREATE TABLE emprecords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    EmailD VARCHAR(100),
    Designation VARCHAR(100)
);

INSERT INTO emprecords (FirstName, LastName, EmailD, Designation)
VALUES 
('Nitin', 'Jadhav', 'nitin.jadhav@xyz.com', 'CEO'),
('Manan', 'Kotak', 'manan.kotak@xyz.com', 'Supervisor'),
('Chaitnya', 'Pawar', 'chaitnya.pawar@xyz.com', 'Process Coordinator'),
('Debanik', 'Kundu', 'debanik.kundu@xyz.com', 'Planner');

SELECT * FROM emprecords;

/* Creating sites table*/
CREATE TABLE sites (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

/*Supervisor table*/
CREATE TABLE supervisors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  site_id VARCHAR(20),
  FOREIGN KEY (site_id) REFERENCES sites(id)
);

/*planner table*/
CREATE TABLE planners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

/*schedular data table*/
CREATE TABLE schedule (
  id INT PRIMARY KEY,
  activity VARCHAR(100),
  sub_activity VARCHAR(100),
  location VARCHAR(100),
  duration INT,
  planned_start DATE,
  planned_end DATE,
  actual_start DATE,
  actual_end DATE,
  delay_days INT,
  predecessor VARCHAR(100),

  site_id VARCHAR(20),
  supervisor_id INT,
  planner_id INT,

  FOREIGN KEY (site_id) REFERENCES sites(id),
  FOREIGN KEY (supervisor_id) REFERENCES supervisors(id),
  FOREIGN KEY (planner_id) REFERENCES planners(id)
);

/*supervisor performance table*/
CREATE TABLE supervisor_performance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  supervisor_id INT,
  completion INT,
  on_time INT,
  FOREIGN KEY (supervisor_id) REFERENCES supervisors(id)
);

/*pallaner delay table*/
CREATE TABLE planner_delays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  planner_id INT,
  avg_delay DECIMAL(4,2),
  FOREIGN KEY (planner_id) REFERENCES planners(id)
);

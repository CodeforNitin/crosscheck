INSERT INTO Sites (id, name) VALUES
('site1', 'Downtown Office Complex'),
('site2', 'Residential Tower A'),
('site3', 'Shopping Mall Renovation');

INSERT INTO supervisors (name, site_id) VALUES
('John Smith', 'site1'),
('Mike Johnson', 'site1'),
('David Brown', 'site2'),
('Lisa Garcia', 'site3');

INSERT INTO Planners (name) VALUES
('Sarah Wilson'),
('Tom Anderson');

-- Schedule Entry 1
INSERT INTO schedule (
  id, activity, sub_activity, location, duration,
  planned_start, planned_end, actual_start, actual_end,
  delay_days, predecessor,
  site_id, supervisor_id, planner_id
) VALUES (
  1, 'Foundation Work', 'Excavation', 'Block A', 14,
  '2024-01-15', '2024-01-29', '2024-01-15', '2024-01-31',
  2, '-',
  'site1', 1, 1
);

-- Schedule Entry 2
INSERT INTO schedule (
  id, activity, sub_activity, location, duration,
  planned_start, planned_end, actual_start, actual_end,
  delay_days, predecessor,
  site_id, supervisor_id, planner_id
) VALUES (
  2, 'Structure', 'Column Casting', 'Block B', 10,
  '2024-02-01', '2024-02-11', '2024-02-02', '2024-02-12',
  1, '1',
  'site1', 2, 2
);

-- Schedule Entry 3
INSERT INTO schedule (
  id, activity, sub_activity, location, duration,
  planned_start, planned_end, actual_start, actual_end,
  delay_days, predecessor,
  site_id, supervisor_id, planner_id
) VALUES (
  3, 'Plumbing', 'Main Line', 'Tower 1', 5,
  '2024-03-01', '2024-03-06', '2024-03-01', '2024-03-05',
  0, '2',
  'site2', 3, 1
);

-- Schedule Entry 4
INSERT INTO schedule (
  id, activity, sub_activity, location, duration,
  planned_start, planned_end, actual_start, actual_end,
  delay_days, predecessor,
  site_id, supervisor_id, planner_id
) VALUES (
  4, 'Electrical', 'Wiring', 'Mall Section A', 7,
  '2024-03-10', '2024-03-17', '2024-03-11', '2024-03-19',
  2, '3',
  'site3', 4, 2
);

INSERT INTO supervisor_performance (supervisor_id, completion, on_time)
VALUES
  ((SELECT id FROM supervisors WHERE name = 'John Smith'), 95, 80),
  ((SELECT id FROM supervisors WHERE name = 'Mike Johnson'), 70, 90),
  ((SELECT id FROM supervisors WHERE name = 'David Brown'), 15, 100),
  ((SELECT id FROM supervisors WHERE name = 'Lisa Garcia'), 60, 75);
  
  
INSERT INTO planner_delays (planner_id, avg_delay)
VALUES
  ((SELECT id FROM planners WHERE name = 'Sarah Wilson'), 1.5),
  ((SELECT id FROM planners WHERE name = 'Tom Anderson'), 0.8);



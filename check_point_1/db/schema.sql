CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY UNIQUE,
  task_name VARCHAR(50),
  task_desc TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  task_time_created TIMESTAMP,
  task_time_start TIMESTAMP,
  task_time_end TIMESTAMP NOT NULL DEFAULT now()
);

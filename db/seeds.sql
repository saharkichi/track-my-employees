USE employeeTracker_DB;

INSERT INTO departments (name)
VALUES ("Sales");

INSERT INTO departments (name)
VALUES ("Customer Service");

INSERT INTO roles (title, salary, dept_id)
VALUES ("CEO", 100000, 4);

INSERT INTO roles (title, salary, dept_id)
VALUES ("Department Manager", 50000, 3);

INSERT INTO employees (first_Name, last_Name, role_id, manager_id)
VALUES ("Jon", "Snow", 2, null);

INSERT INTO employees (first_Name, last_Name, role_id, manager_id)
VALUES ("Sansa", "Stark", 2, null);
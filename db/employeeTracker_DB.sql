-- initalize relevant DATABASE
DROP DATABASE employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;
USE employeeTracker_DB;

-- create tables for departments, roles, and employees 
CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL 
);
CREATE TABLE roles (
    id INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL, 
    dept_id  INT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES departments(id)
    
);
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);
//require and initalize acceptance criteria eg. mysql12 & inquirier
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require('console.table');
const {connection} = require('./config/connection');


//initalize connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});


// add necessary questions and choices as per acceptance criteria including main list
function init() {
    inquirer.prompt([
        {
          name: "choice",
          type: "list",
          message: "What would you like to do?",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a new department",
            "Add a new role",
            "Add a new employee",
            "Quit"
          ]
        }])

// add breaks to start new lines, create choices for user
        .then(function (response) {
            switch (response.choice) {
              case "View all departments":
                viewDepartments();
                break;
              case "View all roles":
                viewRoles();
                break;
              case "View all employees":
                viewEmployees();
                break;
              case "Add a new department":
                addDepartment();
                break;
              case "Add a new role":
                addRole();
                break;
              case "Add a new employee":
                addEmployee();
                break;
              case "Quit":
                process.exit(0);
                break;
            }
          });
      };


//call functions after selected options from tables
//use all acceptance critera required questions and selections
function viewDepartments() {
    connection.query(`SELECT * FROM departments`, function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    })
  };
  
  function viewRoles() {
    connection.query(`SELECT * FROM roles`, function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    })
  };
  
  function viewEmployees() {
    connection.query(`SELECT * FROM employees`, function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    })
  };

// functions for department role 
  function addDepartment() {
    inquirer.prompt([
      {
        name: "addDept",
        type: "input",
        message: "What is the name of the new department?"
      }
    ]).then(function (response) {
      connection.query(
        "INSERT INTO departments SET ?", {
        name: response.addDept
      },
        function (err, res) {
          if (err) throw err;
          console.log(" Department Successfully Added!\n");
          init();
        }
      );
    });
  }
  

//functions for add role
  function addRole() {
    connection.query("SELECT * FROM departments", function (err, res) {
      if (err) throw err;     
      inquirer.prompt([
        {
          name: "role",
          type: "input",
          message: "What is the new role?"
        },
        {
          name: "pay",
          type: "number",
          message: "What is the salary?",
        },
        {
          name: "deptId",
          type: "rawlist",
          message: "Select a department for this role",
          choices: res.map(item => item.name)
        }
      ]).then(function (responses) {
        const selectedDept = res.find(dept => dept.name === responses.deptId);
        connection.query("INSERT INTO roles SET ?",
          {
            title: responses.role,
            salary: responses.pay,
            dept_id: selectedDept.id
          },
          function (err, res) {
            if (err) throw err;
            console.log("New role successfully added!\n");
            init();
          }
        );
      });
    })
  };


//functions for add employee 
  function addEmployee() {
    connection.query("SELECT * FROM roles", function (err, results) {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "first",
          type: "input",
          message: "What is the new employee's first name?"
        },
        {
          name: "last",
          type: "input",
          message: "What is the new employee's last name?"
        },
        {
          name: "roleId",
          type: "rawlist",
          choices: results.map(item => item.title),
          message: "Select a role for the employee"
        }
      ]).then(function (responses) {
        const selectedRole = results.find(item => item.title === responses.roleId);
        connection.query("INSERT INTO employees SET ?",
          {
            first_name: responses.first,
            last_name: responses.last,
            role_id: selectedRole.id
          }, function (err, res) {
            if (err) throw err;
            console.log("Added new employee named " + responses.first + " " + responses.last + "\n");
            init();
          })
      })
    })
  };
  init();

//linkg collaborator & tutor help creating functions 
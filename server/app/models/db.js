const mysql = require("mysql");
const dbConfig = require("../db/db.config.js");
// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the MySQL database!");
});
module.exports = connection;
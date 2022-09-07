import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

var db = null;
if (process.env.NODE_ENV !== 'production') {
  db = new Sequelize(process.env.DATABASE, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: "mysql"
  });
} else {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
}

export default db;
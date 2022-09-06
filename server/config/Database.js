import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.dbpassword);
const db = new Sequelize(process.env.database, process.env.dbusername, process.env.dbpassword, {
    host: process.env.dbhost,
    dialect: "mysql"
});

export default db;
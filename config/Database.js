import {Sequelize} from "sequelize";

const db = new Sequelize('scoupart','root','fje2010',{
    host: "localhost",
    dialect: "mysql"
});

export default db;
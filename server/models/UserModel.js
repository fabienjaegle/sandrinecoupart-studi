import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    lastname:{
        type: DataTypes.STRING
    },
    firstname:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    isPatient:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

export default Users;
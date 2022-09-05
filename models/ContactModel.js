import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Contacts = db.define('contacts', {
    name:{
        type: DataTypes.STRING
    },
    subject: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    message:{
        type: DataTypes.TEXT
    },
},{
    freezeTableName:true,
    timestamps: false
});

export default Contacts;
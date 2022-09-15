import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Categories = db.define('categories',{
    category:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false
});

export default Categories;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Diets = db.define('diets',{
    diet:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false
});

export default Diets;
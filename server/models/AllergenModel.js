import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Allergens = db.define('allergens',{
    allergen:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false
});

export default Allergens;
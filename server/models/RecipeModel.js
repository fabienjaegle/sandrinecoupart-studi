import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Recipes = db.define('recipes',{
    title:{
        type: DataTypes.STRING
    },
    featuredImage:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.TEXT
    },
    prepTimeInMinutes:{
        type: DataTypes.DECIMAL
    },
    restTimeInMinutes:{
        type: DataTypes.DECIMAL
    },
    cookTimeInMinutes:{
        type: DataTypes.DECIMAL
    },
    forPatient:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    publishedDate:{
        type: DataTypes.DATE
    }
},{
    freezeTableName:true
});

export default Recipes;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Reviews = db.define('reviews',{
    name:{
        type: DataTypes.STRING
    },
    comment:{
        type: DataTypes.STRING
    },
    rate:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName:true,
    timestamps: false
});

export default Reviews;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Allergens from "./AllergenModel.js";
import Diets from "./DietModel.js";

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

const UserAllergen = db.define('User_Allergen', {}, {
    freezeTableName:true,
    timestamps: false
});

Users.belongsToMany(Allergens, { through: UserAllergen });
Allergens.belongsToMany(Users, { through: UserAllergen });

const UserDiet = db.define('User_Diet', {}, {
    freezeTableName:true,
    timestamps: false
});

Users.belongsToMany(Diets, { through: UserDiet });
Diets.belongsToMany(Users, { through: UserDiet });

export default Users;
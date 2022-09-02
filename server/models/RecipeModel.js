import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Allergens from "./AllergenModel.js";
import Categories from "./CategoryModel.js";
import Diets from "./DietModel.js";
import Reviews from "./ReviewModel.js";

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
    ingredients:{
        type: DataTypes.TEXT
    },
    directions:{
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
    freezeTableName:true,
    timestamps: false
});

const RecipeAllergen = db.define('Recipe_Allergen', {}, {
    freezeTableName:true,
    timestamps: false
});

Recipes.belongsToMany(Allergens, { through: RecipeAllergen });
Allergens.belongsToMany(Recipes, { through: RecipeAllergen });

const RecipeCategory = db.define('Recipe_Category', {}, {
    freezeTableName:true,
    timestamps: false
});

Recipes.belongsToMany(Categories, { through: RecipeCategory });
Categories.belongsToMany(Recipes, { through: RecipeCategory });

const RecipeDiet = db.define('Recipe_Diet', {}, {
    freezeTableName:true,
    timestamps: false
});

Recipes.belongsToMany(Diets, { through: RecipeDiet });
Diets.belongsToMany(Recipes, { through: RecipeDiet });

Reviews.belongsTo(Recipes);
Recipes.hasMany(Reviews);

export default Recipes;
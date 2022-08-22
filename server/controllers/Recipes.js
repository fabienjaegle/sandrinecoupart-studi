import Recipes from "../models/RecipeModel.js";
import Allergens from "../models/AllergenModel.js";
import Categories from "../models/CategoryModel.js";
import Diets from "../models/DietModel.js";

export const getExcerptPublicRecipies = async(req, res) => {
    try {
        const recipes = await Recipes.findAll({
            attributes:['id', 'title', 'featuredImage', 'publishedDate'],
            where: {
                forPatient: false
            }
        });
        res.json(recipes);
    } catch (error) {
        console.log(error);
    }
}

export const getFullPublicRecipe = async(req, res) => {
    const { recipeid } = req.body;
    try {
        const recipes = await Recipes.findOne({
            include: [{ 
              model: Allergens,
              through: { attributes: []}
            }, {
                model: Categories,
                through: { attributes: []}
            }, {
                model: Diets,
                trough: { attributes: []}
            }],
            where: {
                id: recipeid,
                forPatient: false,
            }
        });
        res.json(recipes);
    } catch (error) {
        console.log(error);
    }
}
import Recipes from "../models/RecipeModel.js";

export const getExcerptBaseRecipies = async(req, res) => {
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
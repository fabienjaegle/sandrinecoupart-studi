import Recipes from "../models/RecipeModel.js";
import Allergens from "../models/AllergenModel.js";
import Categories from "../models/CategoryModel.js";
import Diets from "../models/DietModel.js";
import Reviews from "../models/ReviewModel.js";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const getExcerptPublicRecipies = async(req, res) => {
    try {
        const recipes = await Recipes.findAll({
            attributes:['id', 'title', 'featuredImage', 'prepTimeInMinutes', 'cookTimeInMinutes', 'publishedDate'],
            where: {
                forPatient: false
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 6
        });
        res.json(recipes);
    } catch (error) {
        console.log(error);
    }
}

export const getFullPublicRecipe = async(req, res) => {
    const { recipeid } = req.body;
    try {
        const recipe = await Recipes.findOne({
            include: [{ 
              model: Allergens,
              through: { attributes: []}
            }, {
                model: Categories,
                through: { attributes: []}
            }, {
                model: Diets,
                trough: { attributes: []}
            }, {
                model: Reviews
            }],
            where: {
                id: recipeid,
                forPatient: false,
            }
        });

        const reviewCount = await db.query('SELECT CAST(SUM(rate) / COUNT(id) AS DECIMAL(4,1)) AS globalRate FROM reviews WHERE recipeId = :recipeId',
        {
            replacements: { recipeId: recipeid },
            type: QueryTypes.SELECT
        });
console.log(reviewCount);
        res.json({recipe, reviewCount});
    } catch (error) {
        console.log(error);
    }
}

export const postNewRecipes = async(req, res) => {
    const { title, featuredImage, description, ingredients, directions, prepTimeInMinutes, restTimeInMinutes, cookTimeInMinutes, forPatient, allergens } = req.body;

    try {
        await Recipes.create({
            title: title,
            featuredImage: featuredImage,
            description: description,
            ingredients: ingredients,
            directions: directions,
            prepTimeInMinutes: prepTimeInMinutes,
            restTimeInMinutes: restTimeInMinutes,
            cookTimeInMinutes: cookTimeInMinutes,
            forPatient: forPatient,
        }).then(function(createdRecipe) {
            return createdRecipe.setRecipeAllergens(allergens);
        });

        res.json({msg: "Recette ajoutée avec succès"});
    } catch (error) {
        console.log(error);
    }
}
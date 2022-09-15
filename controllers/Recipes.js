import Recipes from "../models/RecipeModel.js";
import Allergens from "../models/AllergenModel.js";
import Categories from "../models/CategoryModel.js";
import Diets from "../models/DietModel.js";
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

export const getExcerptPrivateRecipies = async(req, res) => {
    const { userid } = req.body;
    try {
        const recipes = await db.query(
        'SELECT DISTINCT(r.id), r.id, r.featuredImage, r.prepTimeInMinutes, r.cookTimeInMinutes FROM recipes r' +
        ' INNER JOIN recipe_allergen ra ON ra.recipeId = r.id' +
        ' INNER JOIN recipe_diet rd ON rd.recipeId = r.id' +
        ' AND rd.dietId IN (' +
        '    SELECT dietId FROM user_diet WHERE userId = :userId' +
        ')' +
        ' AND ra.allergenId NOT IN (' +
        '    SELECT allergenId FROM user_allergen WHERE userId = :userId' +
        ')' +
        ' AND r.forPatient = 1',
        {
            replacements: { userId: userid },
            type: QueryTypes.SELECT
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
            }],
            where: {
                id: recipeid,
                forPatient: false,
            }
        });

        res.json(recipe);
    } catch (error) {
        console.log(error);
    }
}

export const getFullPrivateRecipe = async(req, res) => {
    const { recipeid, userid } = req.body;
    try {
        const recipe = await db.query(
        'SELECT DISTINCT(r.id), r.id, r.featuredImage, r.prepTimeInMinutes, r.cookTimeInMinutes FROM recipes r' +
        ' INNER JOIN recipe_allergen ra ON ra.recipeId = r.id' +
        ' INNER JOIN recipe_diet rd ON rd.recipeId = r.id' +
        ' AND rd.dietId IN (' +
        '    SELECT dietId FROM user_diet WHERE userId = :userId' +
        ')' +
        ' AND ra.allergenId NOT IN (' +
        '    SELECT allergenId FROM user_allergen WHERE userId = :userId' +
        ')' +
        ' AND r.forPatient = 1' +
        ' WHERE r.id = :recipeId',
        {
            replacements: { userId: userid, recipeId: recipeid },
            type: QueryTypes.SELECT
        });
console.log(recipe);
        res.json(recipe);
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
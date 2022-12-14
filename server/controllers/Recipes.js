import Recipes from "../models/RecipeModel.js";
import Allergens from "../models/AllergenModel.js";
import Categories from "../models/CategoryModel.js";
import Diets from "../models/DietModel.js";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const getRecipes = async(req, res) => {
    try {
        const recipes = await Recipes.findAll({
            attributes:['id', 'title', 'prepTimeInMinutes', 'cookTimeInMinutes', 'restTimeInMinutes', 'publishedDate', 'forPatient'],
        });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

export const getRecipe = async(req, res) => {

    try {
        const recipe = await Recipes.findOne({
            attributes:['id', 'title', 'description', 'ingredients', 'directions', 'prepTimeInMinutes', 'cookTimeInMinutes', 'restTimeInMinutes', 'publishedDate', 'forPatient'],
            include: [{ 
                model: Allergens,
                through: { attributes: []}
              }, {
                model: Diets,
                through: { attributes: []}
            }],
            where: {
                id: req.params.id
            }
        });

        res.json(recipe);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

export const updateRecipe = async(req, res) => {
    const { id, title, description, ingredients, directions, prepTimeInMinutes, cookTimeInMinutes, restTimeInMinutes, forPatient, allergens, diets } = req.body;

    try {        
        const recipe = await Recipes.findOne({
            include: [{ 
                model: Allergens,
                through: { attributes: []}
              }, {
                model: Diets,
                through: { attributes: []}
            }],
            where: {
                id: id
            }
        });

        if (recipe) {
            recipe.title = title,
            recipe.description = description,
            recipe.ingredients = ingredients,
            recipe.directions = directions,
            recipe.prepTimeInMinutes = prepTimeInMinutes,
            recipe.cookTimeInMinutes = cookTimeInMinutes,
            recipe.restTimeInMinutes = restTimeInMinutes,
            recipe.forPatient = forPatient,
            recipe.setAllergens(allergens.map(a => a.id));
            recipe.setDiets(diets.map(d => d.id));
            await recipe.save();

            res.json({msg: "Recette mise ?? jour avec succ??s"});
        }else {
            res.status(400).json({msg: "Une erreur est survenue lors de la mise ?? jour de la recette"});
        }
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

export const deleteRecipe = async(req, res) => {
    try {
        const count = await Recipes.destroy({ where: {id: req.params.id }});

        res.json(count);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

export const postNewRecipe = async(req, res) => {
    const { title, description, ingredients, directions, prepTimeInMinutes, cookTimeInMinutes, restTimeInMinutes, forPatient, allergens, diets } = req.body;

    try {
        const recipe = await Recipes.create({
            title: title,
            description: description,
            ingredients: ingredients,
            directions: directions,
            prepTimeInMinutes: prepTimeInMinutes,
            cookTimeInMinutes: cookTimeInMinutes,
            restTimeInMinutes: restTimeInMinutes,
            forPatient: forPatient,
            publishedDate: Date.now()
        });
        
        recipe.setAllergens(allergens);
        recipe.setDiets(diets);

        res.json({msg: "Recette cr????e avec succ??s"});
    } catch (error) {
        res.json({msg: error});
    }
}

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
        res.status(500).json({msg: error});
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
        res.status(500).json({msg: error});
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
                through: { attributes: []}
            }],
            where: {
                id: recipeid,
                forPatient: false,
            }
        });

        res.json(recipe);
    } catch (error) {
        res.status(500).json({msg: error});
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

        res.json(recipe);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}
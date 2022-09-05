import Reviews from "../models/ReviewModel.js";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const getReviews = async(req, res) => {
    const { recipeid } = req.body;

    try {
        const reviews = await db.query('SELECT id, name, comment, rate FROM reviews WHERE recipeId = :recipeId',
        {
            replacements: { recipeId: recipeid },
            type: QueryTypes.SELECT
        });

        res.json(reviews);
    } catch (error) {
        console.log(error);
    }
}

export const getGlobalRate = async(req, res) => {
    const { recipeid } = req.body;

    try {
        const reviewCount = await db.query('SELECT CAST(SUM(rate) / COUNT(id) AS DECIMAL(4,1)) AS globalRate FROM reviews WHERE recipeId = :recipeId',
        {
            replacements: { recipeId: recipeid },
            type: QueryTypes.SELECT
        });
        res.json({globalRate: reviewCount[0].globalRate});
    } catch (error) {
        console.log(error);
    }
}

export const postNewReview = async(req, res) => {
    const { name, comment, rate, recipeid } = req.body;
    console.log(req.body);
    try {
        const newReview = await Reviews.create({
            name,
            comment,
            rate,
            recipeId: recipeid
        })

        res.json({newReview: newReview, msg: "Avis ajouté avec succès"});
    } catch (error) {
        console.log(error);
    }
}
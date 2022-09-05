import express from "express";
import { getUsers, Login, Logout, postNewUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getExcerptPublicRecipies } from "../controllers/Recipes.js";
import { getFullPublicRecipe, postNewRecipes, getExcerptPrivateRecipies, getFullPrivateRecipe } from "../controllers/Recipes.js";
import { getGlobalRate, getReviews, postNewReview } from "../controllers/Reviews.js";
import { getAllergens } from "../controllers/Allergens.js";
import { getDiets } from "../controllers/Diets.js";
import { postNewContact } from "../controllers/Contacts.js";

const router = express.Router();

router.get('/users', getUsers);
router.post('/user', postNewUser);
router.get('/recipes/public/excerpt', getExcerptPublicRecipies);
router.post('/recipes/public/full', getFullPublicRecipe);
router.post('/recipes/private/excerpt', getExcerptPrivateRecipies);
router.post('/recipes/private/full', getFullPrivateRecipe);
router.post('/reviews', getReviews);
router.post('/review/globalRate', getGlobalRate);
router.post('/review', postNewReview);
router.post('/recipes', postNewRecipes);
router.post('/contact', postNewContact);
router.get('/allergens', getAllergens);
router.get('/diets', getDiets);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
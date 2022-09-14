import express from "express";
import { getUsers, Login, Logout, postNewUser, getPatients, getPatient, updatePatient, deletePatient } from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getRecipes, getExcerptPublicRecipies, getFullPublicRecipe, postNewRecipes, getExcerptPrivateRecipies, getFullPrivateRecipe, getRecipe, updateRecipe } from "../controllers/Recipes.js";
import { getGlobalRate, getReviews, postNewReview } from "../controllers/Reviews.js";
import { getAllergens } from "../controllers/Allergens.js";
import { getDiets } from "../controllers/Diets.js";
import { postNewContact } from "../controllers/Contacts.js";
import path from 'path';
import { fileURLToPath } from 'url';

//we need to change up how __dirname is used for ES6 purposes
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get('/users', getUsers);
router.post('/user', postNewUser);
router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipe);
router.put('/recipes/update', updateRecipe);
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
router.get('/patients', getPatients);
router.get('/patients/:id', getPatient);
router.put('/patients/update', updatePatient);
router.delete('/patients/delete/:id', deletePatient);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

export default router;
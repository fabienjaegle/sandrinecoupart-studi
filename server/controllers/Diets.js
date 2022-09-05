import Diets from "../models/DietModel.js";

export const getDiets = async(req, res) => {
    try {
        const diets = await Diets.findAll({
            attributes:['id','diet']
        });
        res.json(diets);
    } catch (error) {
        console.log(error);
    }
}
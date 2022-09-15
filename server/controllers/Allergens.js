import Allergens from "../models/AllergenModel.js";

export const getAllergens = async(req, res) => {
    try {
        const allergens = await Allergens.findAll({
            attributes:['id','allergen']
        });
        res.json(allergens);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}
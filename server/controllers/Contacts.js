import Contacts from "../models/ContactModel.js"

export const postNewContact = async(req, res) => {
    const { values } = req.body;

    try {
        await Contacts.create({
            name: values.name,
            subject: values.subject,
            email: values.email,
            message: values.message
        });

        res.json({msg: "Contact ajouté avec succès"});
    } catch (error) {
        console.log(error);
    }
}
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','lastname', 'firstname', 'username', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { lastname, firstname, email, username, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Les mots de passe ne sont pas identiques"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            lastname: lastname,
            firstname: firstname,
            email: email,
            username: username,
            password: hashPassword
        });
        res.json({msg: "Inscription avec succès"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, user.dataValues.password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user.dataValues.id;
        const lastname = user.dataValues.lastname;
        const firstname = user.dataValues.firstname;
        const email = user.dataValues.email;
        const accessToken = jwt.sign({userId, lastname, firstname, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        console.log(accessToken);
        const refreshToken = jwt.sign({userId, lastname, firstname, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        console.log(refreshToken);
        await Users.update({refresh_token: refreshToken}, {
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Utilisateur introuvable"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
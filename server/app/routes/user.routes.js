module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new Entity
    router.post("/signup", user.signup);
    router.post("/login", user.login);

    app.use('/user', router);
};
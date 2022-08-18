const User = require("../models/user.model.js");
const passwordHash = require("password-hash");

exports.signup = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a User
    const newUser = new User({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      isPatient: req.body.isPatient
    });
    // Save the new User in the database
    User.create(newUser, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data);
    });
};

// Find a single User with an email
exports.login = (req, res) => {
  User.find(req.body.username, req.body.password, (err, data) => {
    if (err) {
      if (err.kind === "incorrect_credentials") {
        res.status(401).send({
          message: `Incorrect credentials with username ${req.body.username} and password ${req.body.password}.`
        });
      } else if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with username ${req.body.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with username " + req.body.username
        });
      }
    } else {
      res.status(200).json({
        token: User.getToken()
      });
    } 
  });
};

// Update a User identified by the id in the request
/*exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  User.updateById(
    req.params.id,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `User not found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};*/
const sql = require("./db.js");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

// constructor
const User = function(user) {
  this.lastname = user.lastname;
  this.firstname = user.firstname;
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
  this.isPatient = user.isPatient;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.find = (username, password, result) => {
  sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      //verify the password
      if (passwordHash.verify(password, res[0].password)) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }else {
        result({ kind: "incorrect_credentials" }, null);
      }
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

/*User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET lastname = ?, firstname = ?, email = ?, password = ? WHERE id = ?",
    [user.lastname, user.firstname, user.email, passwordHash.generate(user.password), id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};*/

User.authenticate = (password) => {
  return passwordHash.verify(password, this.password);
};

User.getToken = () => {
  return jwt.encode(this, config.secret);
};

module.exports = User;
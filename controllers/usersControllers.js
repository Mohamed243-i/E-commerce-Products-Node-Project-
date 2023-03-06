const db = require("../utlis/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createUser(user) {
  var salt = bcryptjs.genSaltSync(10);
  var hashedPassword = bcryptjs.hashSync(user.password, salt);
  return db.execute(
    "INSERT INTO users (username,email, password) VALUES (?,?,?)",
    [user.username, user.email, hashedPassword]
  );
}

function getAllproducts() {
  return db.execute("SELECT * FROM products ");
}

function getproductsByName(name) {
  return db.execute("SELECT * FROM products WHERE name=? ", [name]);
}

function getproductsBySellerName(name) {
  return db.execute(
    "SELECT * FROM products p INNER JOIN seller S on p.seller_id=s.id WHERE s.name=? ",
    [name]
  );
}

function deleteUser(id) {
  return db.execute("DELETE FROM users WHERE id = ?", [id]);
}

function updateUser(id, user) {
  var salt = bcryptjs.genSaltSync(10);
  var hashedPassword = bcryptjs.hashSync(user.password, salt);
  return db.execute(
    "UPDATE users SET username = ?, password = ? WHERE id = ?",
    [user.username, hashedPassword, id]
  );
}

function getUserByUsername(username) {
  return db.execute("SELECT * FROM users WHERE username = ?", [username]);
}

module.exports = {
  getAllproducts,
  getproductsByName,
  getproductsBySellerName,
  updateUser,
  deleteUser,
  createUser,
  getUserByUsername,
};

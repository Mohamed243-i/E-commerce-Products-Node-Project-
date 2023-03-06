const db = require("../utlis/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createSeller(seller) {
  var salt = bcryptjs.genSaltSync(10);
  var hashedPassword = bcryptjs.hashSync(seller.password, salt);
  return db.execute(
    "INSERT INTO seller (name ,email, password) VALUES (?,?,?)",
    [seller.name, seller.email, hashedPassword]
  );
}

const loginSeller = async (email, password) => {
  const [rows] = await db.execute(
    "SELECT id, email, password FROM seller WHERE email = ?",
    [email]
  );
  const seller = rows[0];

  if (!seller) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordValid = await bcryptjs.compare(password, seller.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign({ id: seller.id }, process.env.JWT_KEY);

  return { token };
};

function getSellerByEmail(email) {
  return db.execute("SELECT * FROM seller WHERE email = ?", [email]);
}

module.exports = {
  createSeller,
  loginSeller,
  getSellerByEmail,
};

const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  createSeller,
  getSellerByEmail,
} = require("../controllers/sellersControlers");

router.post("/", (req, res, next) => {
  createSeller(req.body)
    .then((result) => {
      res.status(201).json({ message: "Welcome 🙌 seller created successfully!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  getSellerByEmail(email)
    .then((result) => {
      if (result[0].length === 0) {
        res.status(404).json({ message: "Invalid User" });
      } else {
        const user = result[0][0];
        const isPasswordMatch = bcryptjs.compareSync(password, user.password);
        if (isPasswordMatch) {
          const payload = { email: user.email };
          const token = jwt.sign(payload, "secretkeyWMF", { expiresIn: "500h" });
          res.status(200).json({ message: "Welcome 🙌!", token: token });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ message:err.message });
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { checkToken } = require("../authantication/validate-token");
require("dotenv").config();
var {
  getproductsByName,
  getproductsBySellerName,
  getAllproducts,
  updateUser,
  deleteUser,
  createUser,
  getUserByUsername,
} = require("../controllers/usersControllers");

router.post("/", (req, res, next) => {
  createUser(req.body)
    .then((result) => {
      res.status(201).json({ message: "Welcome 🙌!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  getUserByUsername(username)
    .then((result) => {
      if (result[0].length === 0) {
        res.status(404).json({ message: "Invalid User" });
      } else {
        const user = result[0][0];

        const isPasswordMatch = bcryptjs.compareSync(password, user.password);

        if (isPasswordMatch) {
          console.log(user);
          const payload = { email: user.email };
          console.log(payload);
          const token = jwt.sign(payload, "secretkeyWMF", { expiresIn: "100h" });
          res.status(200).json({ message: " Login Successfully!", token: token });
        } else {
          console.log("not ok");
          res.status(401).json({ message: "Invalid Credentials" });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/Products", checkToken, (req, res, next) => {
  getAllproducts()
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/getProductsbyName/:productname", checkToken, (req, res, next) => {
  var productname = req.params.productname;
  getproductsByName(productname)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get(
  "/getproductsBySellerName/:sellername",
  checkToken,
  (req, res, next) => {
    var sellername = req.params.sellername;
    getproductsBySellerName(sellername)
      .then(([rows]) => {
        res.status(200).json(rows);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
);

router.patch("/:id", checkToken, (req, res, next) => {
  var userId = req.params.id;
  var user = req.body;
  updateUser(userId, user)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", checkToken, (req, res, next) => {
  var userId = req.params.id;
  deleteUser(userId)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;

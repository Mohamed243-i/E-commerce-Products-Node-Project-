const express = require("express");
const router = express.Router();
const { checkToken } = require("../authantication/validate-token");
require("dotenv").config();
const {
  getAllproducts,
  getproductsByName,
  updateproductById,
  createproduct,
  deleteproductById,
  getproductsBySellerName,
} = require("../controllers/productsControllers");

router.get("/", (req, res, next) => {
  getAllproducts()
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:productname", checkToken, (req, res, next) => {
  var productname = req.params.productname;
  getproductsByName(productname)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/getproductsBySellerName/:sellername", checkToken, (req, res, next) => {
  var sellername = req.params.sellername;
  getproductsBySellerName(sellername)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});


router.post("/", checkToken, (req, res, next) => {
  var product = req.body;
  createproduct(product)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(422).json({ message: err.message });
    });
});

router.patch("/:id", checkToken, (req, res, next) => {
  var productId = req.params.id;
  var product = req.body;
  updateproductById(productId, product)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", checkToken, (req, res, next) => {
  var productId = req.params.id;
  deleteproductById(productId)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;

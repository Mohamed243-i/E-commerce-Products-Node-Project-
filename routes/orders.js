const express = require("express");
const router = express.Router();
const { checkToken } = require("../authantication/validate-token");
require("dotenv").config();
const {
  updateorderById,
  createorder,
  getorderById,
  getAllorders,
  deleteorderbyid,
} = require("../controllers/ordersControllers");

router.patch("/:id",checkToken, (req, res, next) => {
  var { id } = req.params;
  var { name } = req.body;
  updateorderById(id, name)
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((err) => {
      res.status(422).json({ message: err.message });
    });
});

router.post("/",checkToken, (req, res, next) => {
  var order = req.body;
  createorder(order)
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((err) => {
      res.status(422).json({ message: err.message });
    });
});

router.get("/:id",checkToken, (req, res, next) => {
  var { id } = req.params;
  getorderById(id)
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});
router.get("/",checkToken, (req, res, next) => {
  getAllorders()
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id",checkToken, (req, res, next) => {
  var { id } = req.params;
  deleteorderbyid(id)
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;

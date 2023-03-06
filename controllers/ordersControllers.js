const db = require("../utlis/db");
function updateorderById(id, name, req, res) {
  return db.execute(" update orders set  name=? where id=?  ", [name, id]);
}
function createorder(order, req, res) {
  return db.execute(" insert into orders (name,user_id) values(?,?) ", [
    order.name,
    order.user_id,
  ]);
}

function getorderById(id) {
  return db.execute(" Select * From orders where id=?", [id]);
}

function getAllorders() {
  return db.execute(" Select * From orders");
}

function deleteorderbyid(id) {
  return db.execute("DELETE FROM  orders WHERE id=?  ", [id]);
}

module.exports = {
  updateorderById,
  createorder,
  getorderById,
  getAllorders,
  deleteorderbyid,
};

const db = require("../utlis/db");

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

function updateproductById(productId, product) {
  return db.execute(
    "UPDATE products SET name=? ,image=?, description=?  WHERE id=? &&  seller_id=? ",
    [
      product.name,
      product.image,
      product.description,
      productId,
      product.seller_id,
    ]
  );
}

function deleteproductById(productId) {
  return db.execute("DELETE FROM products WHERE id=? ", [productId]);
}

function createproduct(product) {
  return db.execute(
    "INSERT INTO products  ( name,image, description, seller_id) VALUES (?,?,?,?) ",
    [product.name, product.image, product.description, product.seller_id]
  );
}

module.exports = {
  getAllproducts,
  getproductsByName,
  updateproductById,
  createproduct,
  deleteproductById,
  getproductsBySellerName,
};

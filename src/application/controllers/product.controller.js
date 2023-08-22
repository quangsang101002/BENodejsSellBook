import productServices from '../services/product.services.js';
const searchProduct = (req, res) => {
  const { name, page, limit } = req.query;

  productServices.searchProduct({ name, page, limit }, (error, result) => {
    if (error) {
      res.status(500).send({
        error: error.message,
      });
    } else {
      res.send({
        result,
      });
    }
  });
};
const addProduct = (req, res) => {
  const bodyUsers = req.body;
  const avatar = req.file;
  productServices.addProduct(
    { ...bodyUsers, authId: req.auth.id, avatar: avatar },
    (error, result) => {
      if (error) {
        res.status(500).send({
          error: error,
        });
      } else {
        res.status(201).send();
      }
    },
  );
};
const getDetailProduct = (req, res) => {
  const productId = req.params;

  productServices.getDetailProduct(productId, (error, result) => {
    if (error) {
      res.status(500).send({
        error: error,
      });
    } else {
      res.send({
        result,
      });
    }
  });
};
const deleteProduct = (req, res) => {
  const productId = req.params;
  productServices.deleteProduct(productId, (error, result) => {
    if (error) {
      res.status(500).send({
        error: error,
      });
    } else {
      res.status(204).send();
    }
  });
};
const updateProduct = (req, res) => {
  const productId = req.params;
  const productBody = req.body;
  productServices.updateProduct(
    { ...productBody, productId, authId: req.auth.id },
    (error, result) => {
      if (error) {
        res.status(500).send({
          error: error,
        });
      } else {
        res.status(204).send();
      }
    },
  );
};
export default {
  addProduct,
  searchProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
};

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
  console.log('>>>>>>>>--------------------------------------', req.body);
  const bodyUsers = req.body;
  const avatar = req.files['avatar'];
  const gallery = req.files['gallery'];

  let responseSent = false; // Cờ kiểm tra đã gửi phản hồi chưa

  productServices.addProduct(
    { ...bodyUsers, authId: req.auth.id, avatar: avatar, gallery: gallery },
    (error, result) => {
      if (responseSent) {
        return; // Đã gửi phản hồi, không thực hiện gì thêm
      }

      responseSent = true; // Đánh dấu là đã gửi phản hồi
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
  const bodyUsers = req.body;
  const avatar = req.files['avatar'];
  const gallery = req.files['gallery'];
  const id = req.params.id;

  let responseSent = false; // Cờ kiểm tra đã gửi phản hồi chưa

  productServices.updateProduct(
    {
      ...bodyUsers,
      authId: req.auth.id,
      avatar: avatar,
      gallery: gallery,
      id: id,
    },
    (error, result) => {
      if (responseSent) {
        return; // Đã gửi phản hồi, không thực hiện gì thêm
      }

      responseSent = true; // Đánh dấu là đã gửi phản hồi
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
const getProductBySku = () => {};
export default {
  addProduct,
  searchProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
  getProductBySku,
};

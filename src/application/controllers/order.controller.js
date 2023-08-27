import orderServices from '../services/order.services.js';
const searchOrder = (req, res) => {
  const { name, page, limit } = req.query;
  orderServices.searchOrder({ name, page, limit }, (error, result) => {
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
const addOrder = (req, res) => {
  const bodyOrder = req.body;
  orderServices.addOrder(
    { ...bodyOrder, authId: req.auth.id },
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
const getDetailOrder = (req, res) => {};
const deleteOrder = (req, res) => {
  const idOrder = req.params.id;
  orderServices.deleteOrder(idOrder, (error, result) => {
    if (error) {
      res.status(500).send({
        error: error,
      });
    } else {
      res.status(201).send();
    }
  });
};
const updateOrder = (req, res) => {
  const idOrder = req.params;
  const bodyOrder = req.body;
  orderServices.updateOrder(
    { bodyOrder, idOrder, authId: req.auth.id },
    (error, result) => {
      if (error) {
        res.status(500).send({
          error: error,
        });
      } else {
        res.status(204).send({
          result,
        });
      }
    },
  );
};
export default {
  searchOrder,
  addOrder,
  getDetailOrder,
  deleteOrder,
  updateOrder,
};

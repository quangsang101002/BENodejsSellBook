import userServices from '../services/user.services.js';
const searchUsers = (req, res) => {
  const { name, page, limit } = req.query;
  userServices.searchUsers({ name, page, limit }, (error, result) => {
    if (error) {
      console.log(error);
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

const addUsers = (req, res) => {
  const bodyUsers = req.body;
  const avatar = req.file;

  userServices.addUsers({ ...bodyUsers, avatar }, (error, result) => {
    if (error) {
      res.status(500).send({
        error: error,
      });
    } else {
      res.status(201).send();
    }
  });
};
const getDetailUser = (req, res) => {
  const { id } = req.params;
  userServices.getDetailUser(id, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error.message,
      });
    } else {
      res.send({
        users: result,
      });
    }
  });
};
const updateUser = (req, res) => {
  const bodyUpdate = req.body;
  const id = req.params.id; // Lấy id từ req.params

  userServices.updateUser(bodyUpdate, id, (error, result) => {
    if (error) {
      res.status(500).send({
        error: error.message,
      });
    } else {
      res.status(204).send();
    }
  });
};
const deleteUser = (req, res) => {
  const { id } = req.params;
  console.log('idc', id);
  userServices.deleteUser(id, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error.message,
      });
    } else {
      res.status(204).send();
    }
  });
};
export default {
  searchUsers,
  addUsers,
  getDetailUser,
  updateUser,
  deleteUser,
};

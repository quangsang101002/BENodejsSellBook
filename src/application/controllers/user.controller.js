import userServices from '../services/user.services.js';
const searchUsers = (req, res) => {
  const { name, page, limit } = req.query;
  userServices.searchUsers(
    { name: name, page: page, limit: limit },
    (error, result) => {
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
    },
  );
};

const addUsers = (req, res) => {};
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
const updateUser = (req, res) => {};
const deleteUser = (req, res) => {
  const { id } = req.params;
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

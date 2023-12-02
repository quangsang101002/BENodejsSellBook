import userServices from '../services/user.services.js';
const searchUsers = (req, res) => {
  const { name, page, limit } = req.query;
  userServices.searchUsers({ name, page, limit }, (error, result) => {
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

const addUsers = (req, res) => {
  console.log('------------------------------', req.auth);
  if (req.auth.role !== 1) {
    res.status(403).send({
      error: 'Không có quyền truy cập',
    });
    return;
  }
  const bodyUsers = req.body;
  const avatar = req.file;
  userServices.addUsers(
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

const updateAvatar = (req, res) => {
  const avatar = req.file;
  const id = req.params;
  console.log(avatar, id);

  userServices.updateAvatar(avatar, id, (error, result) => {
    if (error) {
      res.status(500).send({ error: error });
    } else {
      res.status(204).send();
    }
  });
};

const getDetailUser = (req, res) => {
  console.log('getDetailUse', req.auth.id);
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
  userServices.deleteUser(id, (error, result) => {
    if (error) {
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
  updateAvatar,
  getDetailUser,
  updateUser,
  deleteUser,
};

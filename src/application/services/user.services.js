import userRepository from '../repositories/user.repository.js';

const searchUsers = (params, callback) => {
  if (!/^\d+$/.test(params.limit)) {
    callback({ message: 'Đây không phải là số' }, null);
  } else if (!/^\d+$/.test(params.page)) {
    callback({ message: 'Đây không phải là số' }, null);
  } else {
    userRepository.searchUsers(params, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
};

const addUsers = (req, res) => {};
const getDetailUser = (params, callback) => {
  userRepository.getDetailUser(params, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
const updateUser = (req, res) => {};
const deleteUser = (params, callback) => {
  userRepository.deleteUser(params, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
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

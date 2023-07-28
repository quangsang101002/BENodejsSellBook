import getNextId from '../utilities/getNextId.js';

let users = [
  {
    id: 1,
    username: 'thailq',
    email: 'thailq@mail.com',
  },
  {
    id: 2,
    username: 'giangnt',
    email: 'giangnt@mail.com',
  },
];

// Trả về trang HTML hiển thị danh sách users
const searchUsers = (req, res) => {};

// Trả về HTML - form thêm mới user
const viewAddUser = (req, res) => {};

// Thực thi add user: nhận request từ form thêm mới user
const addUser = (req, res) => {};

// Trả về HTML - thông tin user
const getDetailUser = (req, res) => {};

// Trả về HTML form cập nhật user
const viewEditUser = (req, res) => {};

// Thực thi cập nhật user
const updateUser = (req, res) => {
  const { id } = req.params;

  const input = req.body;

  users = users.map((user) => {});

  // Chuyển hướng về trang danh sách
  res.redirect('/users');
};

// Thực thi xóa user
const deleteUser = (req, res) => {};

export default {
  searchUsers,
  viewAddUser,
  addUser,
  getDetailUser,
  viewEditUser,
  updateUser,
  deleteUser,
};

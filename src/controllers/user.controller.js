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
const searchUsers = (req, res) => {
  res.render('pages/users/index', {
    title: 'welcome',
    users: users,
  });
};

// Trả về HTML - form thêm mới user
const viewAddUser = (req, res) => {
  res.render('pages/users/new');
};

// Thực thi add user: nhận request từ form thêm mới user
const addUser = (req, res) => {
  users.push({
    ...req.body,
    id: getNextId(users),
  });
  res.redirect('/users');
};

// Trả về HTML - thông tin user
const getDetailUser = (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id == id);
  if (user) {
    users = users.filter((user) => user.id == id);
    res.redirect('/users');
  } else {
    res.render('errors/404', {
      msg: 'Người dùng không tồn tại',
    });
  }
};

// Trả về HTML form cập nhật user
const viewEditUser = (req, res) => {
  const { id } = req.params;

  users.map((user) => {
    if (user.id == id) {
      res.render('pages/users/edit', {
        user: user,
      });
    }
  });
};

// Thực thi cập nhật user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const update = users.map((user) => {
    if (user.id == id) {
      user.username = username;
      user.email = email;
    }
    return user;
  });
  users = update;
  res.redirect('/users');
};

// Thực thi xóa user
const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);
  if (user) {
    users = users.filter((user) => user.id != id);

    res.redirect('/users');
  } else {
    res.render('errors/404', {
      msg: 'Người dùng không tồn tại',
    });
  }
};

export default {
  searchUsers,
  viewAddUser,
  addUser,
  getDetailUser,
  viewEditUser,
  updateUser,
  deleteUser,
};

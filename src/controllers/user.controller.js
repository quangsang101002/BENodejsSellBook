import getNextId from '../utilities/getNextId.js';
import pool from '../configs/connectDB.js';

// Trả về trang HTML hiển thị danh sách users
const searchUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  pool.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    res.render('pages/users/index', { users: rows });
  });
};

// Trả về HTML - form thêm mới user
const viewAddUser = (req, res) => {
  res.render('pages/users/new');
};

// Thực thi add user: nhận request từ form thêm mới user
const addUser = async (req, res) => {
  const { username, email } = req.body;
  await pool.query(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, '', 2],
  );
  return res.redirect('/users');
};

// Trả về HTML - thông tin user
const getDetailUser = async (req, res) => {
  const { id } = req.params;
  // await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  const sqldb = 'SELECT * FROM users';

  await pool.query(sqldb, (error, result) => {
    if (error) {
      console.log(erre);
    }

    const search = result.filter((user) => user.id == id);
    res.render('pages/users/index', {
      title: 'welcome',
      users: search,
    });
  });

  // const search = users.filter((user) => user.id == id);
};

// Trả về HTML form cập nhật user
const viewEditUser = async (req, res) => {
  const { id } = req.params;
  const userEdit = `SELECT * FROM users WHERE id = ${id}`;
  pool.query(userEdit, (err, rows) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('pages/users/edit', { user: rows[0] });
  });
};

// Thực thi cập nhật user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  await pool.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [
    username,
    email,
    id,
  ]);

  return res.redirect('/users');
};

// Thực thi xóa user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await pool.query(`DELETE FROM users WHERE id = ${id}`);
  return res.redirect('/users');
};
// await pool.query(sqlDelete, (err, rows) => {
//   if (err) {
//     console.error('Error executing query: ', err);
//     return res.status(500).send('Internal Server Error');
//   }
//   res.render('pages/users/index', { users: rows });
// });
// return res.redirect('/users');
export default {
  searchUsers,
  viewAddUser,
  addUser,
  getDetailUser,
  viewEditUser,
  updateUser,
  deleteUser,
};

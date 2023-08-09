import getConnection from '../../config/connection.database.js';

const searchUsers = (params, callback) => {
  const connection = getConnection();
  const bindname = [];
  let sql = 'SELECT * FROM users';

  const page = params.page || 1;
  const limit = params.limit || 3;

  const offset = (page - 1) * limit;

  if (params.name) {
    const name = ['%' + params.name + '%'];
    sql += ' WHERE username LIKE ?';
    bindname.push(name);
  }
  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  connection.query(
    sql,
    bindname,

    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }

      connection.end();
    },
  );
};
const addUsers = (req, res) => {};
const getDetailUser = (params, callback) => {
  const connection = getConnection();
  const sqlDetail = 'SELECT * FROM users WHERE id = ?';
  connection.query(sqlDetail, [params], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
const updateUser = (req, res) => {};
const deleteUser = (params, callback) => {
  console.log('params', params);
  const connection = getConnection();
  const sqlDelete = 'DELETE FROM users WHERE id = ?';
  connection.query(sqlDelete, [4], (error, result) => {
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

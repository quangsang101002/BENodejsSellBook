import getConnection from '../../config/connection.database.js';
import moment from 'moment/moment.js';
const currentTime = moment();
const searchUsers = (params, callback) => {
  const connection = getConnection();
  let sql = ' FROM users';
  const bindParams = [];

  const page = params.page || 1;
  const limit = params.limit || 3;
  const offset = (page - 1) * limit;

  if (params.name) {
    const name = '%' + params.name + '%';
    sql += ' WHERE username LIKE ?';
    bindParams.push(name);
  }
  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  connection.query(
    'SELECT COUNT(1) AS total' + sql,
    bindParams,
    (error, countResult) => {
      if (error) {
        callback(error, null);
      } else if (countResult[0].total !== 0) {
        connection.query('SELECT *' + sql, bindParams, (error, result) => {
          if (error) {
            callback(null, error);
          } else {
            callback(null, {
              total: countResult[0].total,
              recount: result,
            });
          }
        });
        connection.end();
      } else {
        callback(null, {
          total: 0,
          recount: [],
        });
        connection.end();
      }
    },
  );
};
const addUsers = (user, callback) => {
  const connection = getConnection();
  const userToCeate = {
    ...user,
    create_by: 1,
    create_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
    update_by: 1,
    update_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
  };

  const sqlAdd = 'INSERT INTO users SET ?';
  connection.query(sqlAdd, [userToCeate], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
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
const updateUser = (params, id, callback) => {
  const connection = getConnection();

  const { username, last_name, first_name, email } = params;
  const updateTime = currentTime.format('YYYY-MM-DD HH:mm:ss');

  const sqlUpdate =
    'UPDATE users SET username=?, last_name=?, first_name=?, email=? , update_at = ? WHERE id = ?';
  connection.query(
    sqlUpdate,
    [username, last_name, first_name, email, updateTime, id], // Sử dụng biến id ở đây
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    },
  );
};

const deleteUser = (params, callback) => {
  console.log(params);
  const connection = getConnection();
  const sqlDelete = 'DELETE FROM users WHERE id = ?';
  connection.query(sqlDelete, [params], (error, result) => {
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

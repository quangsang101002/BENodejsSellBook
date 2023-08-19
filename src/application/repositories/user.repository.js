import getConnection from '../../config/connection.database.js';
import moment from 'moment/moment.js';
import { encryptPassWord } from '../../utilities/hash.util.js';
const currentTime = moment();
const searchUsers = (params, callback) => {
  const connection = getConnection();
  let sql = ' FROM users';
  const bindParams = [];
  const page = params.page || 1;
  const limit = params.limit || 5;
  const offset = (page - 1) * limit;

  if (params.name) {
    const name = '%' + params.name + '%';
    sql += ' WHERE username LIKE ?';
    bindParams.push(name);
  }

  connection.query(
    'SELECT COUNT(1) AS total' + sql,
    bindParams,
    (error, countResult) => {
      if (error) {
        callback(error, null);
      } else if (countResult[0].total !== 0) {
        const selectColumnsQuery =
          'SELECT id, username, email, first_name, last_name, role, avatar, create_at, create_by, update_at, update_by' +
          sql +
          ` LIMIT ${limit} OFFSET ${offset}`;

        connection.query(selectColumnsQuery, bindParams, (error, result) => {
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
    password: encryptPassWord(user.password),
    create_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
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
const addSingle = (params, idAdmin, callback) => {
  const id = idAdmin.id;
  const connection = getConnection();
  const sqlUpdate = 'UPDATE users SET avatar = ? WHERE id = ?';
  connection.query(sqlUpdate, [params, id], (error, result) => {
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

const getUserbyUserNameAndRole = (username, role, callback) => {
  const connection = getConnection();
  const sqlDetail = 'SELECT * FROM users WHERE username= ? and role = ?';
  connection.query(sqlDetail, [username, role], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
  connection.end();
};

const getUserByApiKey = (apiKey, callback) => {
  const connection = getConnection();

  connection.query(
    `
    SELECT
      id,
      username,
      email,
      first_name,
      last_name,
      role,
      avatar,
      create_at,
      create_by,
      update_at,
      update_by
    FROM users
    WHERE
      api_key = ?
  `,
    [apiKey],
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    },
  );

  connection.end();
};

const createApiKey = (userId, apiKey, callback) => {
  const connection = getConnection();

  connection.query(
    'UPDATE users SET api_key = ? WHERE id = ?',
    [apiKey, userId],
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, apiKey);
      }
    },
  );

  connection.end();
};

const updateUser = (params, id, callback) => {
  const connection = getConnection();

  const { username, last_name, first_name, email } = params;
  const updateTime = currentTime.format('YYYY-MM-DD HH:mm:ss');

  const sqlUpdate =
    'UPDATE users SET username=?, last_name=?, first_name=?, email=? , update_at = ? WHERE id = ?';

  if (params.password) {
    sql += ', password = ?';
    bindParams.push(encryptPassWord(params.password));
  }
  if (params.avatar) {
    sql += ', avatar = ?';
    bindParams.push(params.avatar);
  }
  connection.query(
    sqlUpdate,
    [username, last_name, first_name, email, updateTime, id],
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
  addSingle,
  getDetailUser,
  getUserbyUserNameAndRole,
  updateUser,
  deleteUser,
  createApiKey,
  getUserByApiKey,
};

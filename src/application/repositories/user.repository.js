import getConnection from '../../config/connection.database.js';
import { encryptPassWord } from '../../utilities/hash.util.js';
import moment from 'moment/moment.js';
const currentTime = moment();
const searchUsers = (params, callback) => {
  const connection = getConnection();
  let sql = ' FROM users';
  const bindParams = [];

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
        let selectColumnsQuery =
          'SELECT id, username, email, first_name, last_name, role, avatar, create_at, create_by, update_at, update_by' +
          sql;

        if (params.limit && params.page) {
          const page = params.page || 1;
          const limit = params.limit || 5;
          const offset = (page - 1) * limit;
          selectColumnsQuery += ` LIMIT ${limit} OFFSET ${offset}`;
        }

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
  connection.end();
};
const updateAvatar = (params, idAdmin, callback) => {
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
  connection.end();
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

  let sqlUpdate =
    'UPDATE users SET username=?, last_name=?, first_name=?, email=? , update_at = ?';
  let bindParams = [username, last_name, first_name, email, updateTime];

  if (params.password) {
    sqlUpdate += ', password = ?';
    bindParams.push(encryptPassWord(params.password));
  }
  if (params.avatar) {
    sqlUpdate += ', avatar = ?';
    bindParams.push(params.avatar);
  }

  sqlUpdate += ' WHERE id = ?';
  bindParams.push(id);
  connection.query(sqlUpdate, bindParams, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
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
const register = async (newUser, callback) => {
  const connection = getConnection();
  const getUserQuery = 'SELECT username, email FROM rikkei_academy.users';

  try {
    // Fetch existing users from the database
    const existingUsers = await new Promise((resolve, reject) => {
      connection.query(getUserQuery, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    // Check if the provided username or email already exists
    const usernameExists = existingUsers.some(
      (user) => user.username === newUser.username,
    );
    const emailExists = existingUsers.some(
      (user) => user.email === newUser.email,
    );

    if (usernameExists) {
      callback({ username: 'Tên người dùng đã tồn tại' }, null);
    } else if (emailExists) {
      callback({ email: 'Email người dùng đã tồn tại' }, null);
    } else {
      const registerUser = {
        ...newUser,
        password: encryptPassWord(newUser.password),
        create_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
        update_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
      };

      const sqlRegister = 'INSERT INTO users SET ?';

      // Insert the new user into the database
      connection.query(sqlRegister, [registerUser], (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, result);
        }
      });
    }
  } catch (error) {
    callback(error, null);
  }
};

export default {
  searchUsers,
  addUsers,
  updateAvatar,
  getDetailUser,
  getUserbyUserNameAndRole,
  updateUser,
  deleteUser,
  createApiKey,
  getUserByApiKey,
  register,
};

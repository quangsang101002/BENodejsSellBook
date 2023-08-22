import userRepository from '../repositories/user.repository.js';
import { comparePassWord } from '../../utilities/hash.util.js';
import { randomString } from '../../utilities/string.util.js';

const login = (params, callback) => {
  const { username, password, type } = params;
  // TODO: Validate

  let role = null;
  if (type === 'admin') {
    role = 1;
  } else if (type === 'customer') {
    role = 2;
  }

  userRepository.getUserbyUserNameAndRole(username, role, (error, result) => {
    if (error) {
      callback(
        {
          code: 500,
          message: error.message,
        },
        null,
      );
    } else if (result.length === 0) {
      callback(
        {
          code: 401,
          message: 'User not found',
        },
        null,
      );
    } else {
      const user = result[0];

      if (!comparePassWord(password, user.password)) {
        callback(
          {
            code: 401,
            message: 'Sai mật khẩu',
          },
          null,
        );
      } else {
        const apiKey = user.id + randomString(128);

        userRepository.createApiKey(user.id, apiKey, (error, result) => {
          if (error) {
            callback(
              {
                code: 500,
                message: error.message,
              },
              null,
            );
          } else {
            callback(null, {
              token: result,
            });
          }
        });
      }
    }
  });
};

const logout = (authId, callback) => {
  userRepository.createApiKey(authId, null, (error, result) => {
    if (error) {
      callback(
        {
          code: 500,
          message: error.message,
        },
        null,
      );
    } else {
      callback(null, {});
    }
  });
};
const getAuth = (authId, callback) => {
  userRepository.getDetailUser(authId, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result[0]);
    }
  });
};

const register = (bodyRegister, callback) => {
  userRepository.register(bodyRegister, (error, result) => {});
};
export default {
  login,
  logout,
  register,
  getAuth,
};

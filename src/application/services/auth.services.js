import userRepository from '../repositories/user.repository.js';
import { comparePassWord } from '../../utilities/hash.util.js';
const login = (params, callback) => {
  const { username, password, type } = params;

  let role = null;
  if (type == 'admin') {
    role = 1;
  } else if (type == 'custermer') {
    role = 2;
  }
  userRepository.getUserbyUserNameAndRole(username, role, (error, result) => {
    {
      if (error) {
        callback(
          {
            code: 500,
            message: error.message,
          },
          null,
        );
      } else if (result.length == 0) {
        callback({ code: 401, message: 'không tìm thấy User' }, null);
      } else {
        const user = result[0];
        if (!comparePassWord(password, user.password)) {
          callback({ code: 401, message: 'sai mật khẩu' }, null);
        } else {
          userRepository.createApiKey(user.id, (error, result) => {
            if (error) {
              callback(
                {
                  code: 500,
                  message: error.message,
                },
                null,
              );
            } else {
              callback(null, { token: result });
            }
          });
        }
      }
    }
  });
};
const register = (req, res) => {};
export default {
  login,
  register,
};

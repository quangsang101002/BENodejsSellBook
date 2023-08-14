import authServices from '../services/auth.services.js';

const login = (req, res) => {
  const requestBody = req.body;
  const params = {
    username: requestBody.username,
    password: requestBody.password,
    type: requestBody.type,
  };
  authServices.login(params, (error, result) => {
    if (error) {
      res.status(error.code).send({
        error: error.message,
      });
    } else {
      res.send(result);
    }
  });
};
const register = (req, res) => {};
export default {
  login,
  register,
};

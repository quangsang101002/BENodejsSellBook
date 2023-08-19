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

const getAuth = (request, response) => {
  authServices.getAuth(request.auth.id, (error, result) => {
    if (error) {
      response.status(401).send({
        error: error,
      });
    } else {
      response.send(result);
    }
  });
};
const logout = (request, response) => {
  authServices.logout(request.auth.id, (error, result) => {
    if (error) {
      response.status(401).send({
        error: error,
      });
    } else {
      response.send(result);
    }
  });
};
const register = (req, res) => {};
export default {
  login,
  register,
  logout,
  getAuth,
};

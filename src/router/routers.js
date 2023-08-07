import userController from '../controllers/user.controller.js';
import express from 'express';
const router = express.Router();

const initWebRouter = (app) => {
  // User management
  router.get('/users', userController.searchUsers);
  router.get('/users/new', userController.viewAddUser);
  router.post('/users', userController.addUser);
  router.get('/users/:id', userController.getDetailUser);
  router.get('/users/:id/edit', userController.viewEditUser);
  router.put('/users/:id', userController.updateUser);
  router.delete('/users/:id', userController.deleteUser);
  return app.use('/', router);
};

export default initWebRouter;

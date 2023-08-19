import { Router } from 'express';
import userController from './controllers/user.controller.js';
import authController from './controllers/auth.controller.js';
import multer from 'multer';
import uploadConfig from '../config/upload.config.js';
import authMiddleware from './middlewares/auth.middleware.js';

const upload = multer(uploadConfig);
const router = Router();
router.use(authMiddleware);
// Authentication
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/auth', authController.getAuth);
router.post('/register', authController.register);
// User management
router.get('/users', userController.searchUsers);
router.post('/users', upload.single('avatar'), userController.addUsers);
router.put('/single/:id', upload.single('avatar'), userController.addSingle);
router.get('/users/:id', userController.getDetailUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Product management

// Order management

// Contact management

export default router;

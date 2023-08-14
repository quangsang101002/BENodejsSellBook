import { Router } from 'express';
import userController from './controllers/user.controller.js';
import authController from './controllers/auth.controller.js';
import multer from 'multer';
import uploadConfig from '../config/upload.config.js';

const upload = multer(uploadConfig);
const router = Router();

// Authentication
router.post('/login', authController.login);
// User management
router.get('/users', userController.searchUsers);
router.post('/users', upload.single('avatar'), userController.addUsers);
router.get('/users/:id', userController.getDetailUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Product management

// Order management

// Contact management

export default router;

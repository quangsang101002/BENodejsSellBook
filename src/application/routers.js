import { Router } from 'express';
import userController from './controllers/user.controller.js';
import multer from 'multer';
import uploadConfig from '../config/upload.config.js';

const upload = multer(uploadConfig);
const router = Router();

// User management
router.get('/users', userController.searchUsers);
router.post('/users', upload.array('avatar', 12), userController.addUsers);
router.get('/users/:id', userController.getDetailUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Product management

// Order management

// Contact management

export default router;

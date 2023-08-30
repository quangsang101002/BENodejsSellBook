import { Router } from 'express';
import userController from './controllers/user.controller.js';
import authController from './controllers/auth.controller.js';
import productController from './controllers/product.controller.js';
import orderController from './controllers/order.controller.js';
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
router.post('/register', upload.single('register'), authController.register);
// User management
router.get('/users', userController.searchUsers);
router.post('/users', upload.single('avatar'), userController.addUsers);
router.put('/avatar/:id', upload.single('avatar'), userController.updateAvatar);
router.get('/users/:id', userController.getDetailUser);
router.put('/users/:id', upload.single('avatar'), userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Product management

router.get('/product', productController.searchProduct);
router.post(
  '/product',
  upload.fields([{ name: 'avatar' }, { name: 'gallery' }]),
  productController.addProduct,
);
router.get('/product/:id', productController.getDetailProduct);
router.put(
  '/product/:id',
  upload.single('images'),
  productController.updateProduct,
);
router.delete('/product/:id', productController.deleteProduct);

// Order management
router.get('/order', orderController.searchOrder);
router.post('/order', upload.single('order'), orderController.addOrder);
router.get('/order/:id', orderController.getDetailOrder);
router.put('/order/:id', upload.single('status'), orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);
// Contact management

export default router;

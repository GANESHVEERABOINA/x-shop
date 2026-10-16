import express from 'express';
import { loginUser, registerUser, adminLogin, getUserProfile, addUserAddress } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// Real Account APIs
userRouter.get('/profile', authUser, getUserProfile);
userRouter.post('/add-address', authUser, addUserAddress);

export default userRouter;
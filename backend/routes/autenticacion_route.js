import express, { Router } from 'express';
import { login, protectedRoute, register, refreshToken, logout} from '../controllers/AutenticacionController.js';
import { registro, loginmd } from '../middlewares/validacioningreso.js';
import { tokenUser } from '../middlewares/userToken.js';

const router = express.Router();

router.post('/register', registro, register);

router.post('/login', loginmd, login);

router.post('/logout', logout);

router.get('/refresh', refreshToken)

router.get('/protected',tokenUser, protectedRoute)


export default router;
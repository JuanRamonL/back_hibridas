import express, { Router } from 'express';
import { login, protectedRoute, register, refreshToken, logout, } from '../controllers/AutenticacionController.js';
import { changePassword, forgotPassword, verifyUser } from '../controllers/ForgotController.js';
import { registro, loginmd } from '../middlewares/validacioningreso.js';
import { tokenUser } from '../middlewares/userToken.js';

const router = express.Router();

router.post('/register', registro, register);

router.post('/login', loginmd, login);

router.post('/logout', logout);

router.get('/refresh', refreshToken);

router.get('/protected',tokenUser, protectedRoute)

//Envio de correo para recuperar contraseña
router.post('/forgotPassword', forgotPassword);

//Verificar usuario
router.get('/change-password/:id/:token', verifyUser);

//Cambiar contraseña
router.put('/change-password/:id/:token', changePassword);




export default router;
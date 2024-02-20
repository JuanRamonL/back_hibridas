import express, { Router } from 'express';
import { respuestaIa } from '../controllers/consultasIaController.js';

const router = express.Router();


router.post('/chat', respuestaIa);

export default router;
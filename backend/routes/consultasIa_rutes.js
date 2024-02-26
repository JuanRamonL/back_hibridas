import express, { Router } from 'express';
import { respuestaIa,completarTextoIa, CorregirInfoTextoIa, CorregirTextoIa} from '../controllers/consultasIaController.js';

const router = express.Router();


router.post('/chat', respuestaIa);

router.post('/completar', completarTextoIa);

router.post('/corregir', CorregirInfoTextoIa);

router.post('/sintaxis', CorregirTextoIa);

export default router;
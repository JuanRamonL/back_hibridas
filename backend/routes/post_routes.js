import express, { Router } from 'express';
import { entradas, nuevaEntrada, eliminarEntrada, entradasPorId, editarEntrada } from '../controllers/PostControllers.js';
const router = express.Router();

router.get('/', entradas);

router.get('/:id', entradasPorId);

router.post('/', nuevaEntrada);

router.delete('/:id/eliminar', eliminarEntrada);

router.put('/:id/actualizar', editarEntrada);



export default router;


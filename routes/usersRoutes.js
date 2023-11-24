import express, { Router } from 'express';
import { eliminar, list, modificar, usuariosPorId } from '../controllers/UsersControllers.js';
const router = express.Router();

router.get('/', list);

router.get('/:id', usuariosPorId);

router.put('/:id/modificar', modificar);

router.delete('/:id/eliminar',eliminar);

export default router;

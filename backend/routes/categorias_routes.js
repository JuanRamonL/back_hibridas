import express, { Router } from 'express';
import { categorias, categoriasPorId, nuevaCategoria, modificarCategoria, eliminarCategoria } from '../controllers/CategoriasController.js';
const router = express.Router();

router.get('/', categorias);

router.get('/:id', categoriasPorId);

router.post('/', nuevaCategoria);

router.put('/:id/modificar', modificarCategoria);

router.delete('/:id/eliminar',eliminarCategoria);

export default router;

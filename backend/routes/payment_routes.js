import express, { Router } from 'express';
import { createOrder, savePayment, vincularSuscripcion} from '../controllers/PaymentController.js';
const router = express.Router();


router.post('/create-order', createOrder);

router.post('/save-payment', savePayment);

router.post('/vincular-suscripcion', vincularSuscripcion);


export default router;
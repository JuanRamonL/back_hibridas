import express, { Router } from 'express';
import { createOrder, savePayment } from '../controllers/PaymentController.js';
const router = express.Router();


router.post('/create-order', createOrder);

router.post('/save-payment', savePayment);


export default router;
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Payment } from '../models/PaymentSchema.js';
import { Usuarios } from '../models/UsuariosSchema.js';

const apiKeyMercadoPago = 'TEST-3078465502370344-022812-6d95a34377f257019b3521cd2845cbf9-344312195'; 
const client = new MercadoPagoConfig({ accessToken: apiKeyMercadoPago });


export const createOrder = async (req, res) => {
    try {
        const servicio = req.body;
        console.log(servicio);

        const body = { 
            items: [
                {
                    title: servicio.title,
                    quantity: 1,
                    unit_price: 2000,
                    price: servicio.price,
                    currency_id: 'ARS'
                },
            ],
            back_urls: {
                success: 'http://localhost:5173/suscribirme/resultado_pago',
                failure: 'http://localhost:5173/suscribirme/resultado_pago',
                pending: 'https://www.youtube.com/watch?v=mCdA4bJAGGk',
            },
        };

        const preference = new Preference(client);

        const response = await preference.create({body});

        console.log(response.id);

        res.json(response);


    } catch (error) {
        console.error('Error al procesar la orden:', error);
        res.status(500).json({ message: error.message });
    }
}

export const savePayment = async (req, res) => {
    try {
        const { id_user, collection_id, collection_status, payment_id, status, payment_type, merchant_order_id, preference_id, site_id, processing_mode } = req.body;
        console.log(req.body);

        const payment = new Payment(req.body);
        
        const savedPayment = await payment.save();
        
        await payment.save();
        
        res.status(201).json(savedPayment);

    } catch (error) {
        console.error('Error al guardar el pago:', error);
        res.status(500).json({ message: error.message });
    }
}

export const vincularSuscripcion = async (req, res) => {
    try {
        const { id_user, payment_id } = req.body;
        console.log(req.body);

        const payment = await Payment.findOne({ payment_id: payment_id });

        const user = await Usuarios.findById({ _id: id_user });

        if(payment.collection_status == 'approved' && payment.id_user == user._id){
            user.suscription = true;
        }
        const updatedUser = await user.save();

        res.status(201).json(updatedUser);

    }catch (error) {
        console.error('Error al vincular la suscripción:', error);
        res.status(500).json({ message: error.message });
    }
}





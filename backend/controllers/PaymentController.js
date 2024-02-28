import { MercadoPagoConfig, Preference } from 'mercadopago';

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
                success: 'https://www.youtube.com/watch?v=-VD-l5BQsuE',
                failure: 'https://www.youtube.com/watch?v=-VD-l5BQsuE',
                pending: 'https://www.youtube.com/watch?v=-VD-l5BQsuE',
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




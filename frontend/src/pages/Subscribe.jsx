import { useState } from 'react';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

function Subscribe() {
    const [preferenceId, setPreferenceId] = useState(null);
    const [title, setTitle] = useState('Suscripción a blog de noticias');
    const [price, setPrice] = useState(2000.0);


    initMercadoPago(
        'TEST-c22c7a37-abd6-4e77-876d-8c017ebdbcb0',{
        local: 'es-AR'
    });

    const crearPreferencia = async () => {
    try {
        const response = await fetch('http://localhost:2023/Api/v1/payment/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    {
                        title: 'Suscripción a blog de noticias',
                        quantity: 1,
                        price: 2000.0,
                        currency_id: 'ARS'
                    },
                ],
            })
        });

        const {id} = await response.json();
        return id;
        /* const data = await response.text(); // Obtener el texto devuelto por el servidor
        console.log(data); // Verificar el valor recibido del servidor
        return data; // Devolver el ID de la preferencia */

    } catch (error) {
        console.error("Error al procesar la orden:", error);
        return null; // Devolver null en caso de error
    }
}


    const handleClick = async () => {
        const id = await crearPreferencia();
        console.log(id);
        if(id){
            setPreferenceId(id);
        }else{
            console.error('Error al procesar la orden');    
        }
    }


    return (
        <>
            <div className="container my-4">
                <div className="text-center d-flex align-items-center">
                    <div className="row justify-content-center">

                        <div className="col-12 col-lg-6 mb-4">
                            <div className="">
                                <h1 className="mb-3 fw-bold"> Únete a nuestra comunidad: Suscríbete al Blog </h1>
                                <p className="h5">Descubre contenido exclusivo, noticias frescas y consejos prácticos directamente en tu bandeja de entrada</p>
                            </div>

                        </div>

                        <div>
                            <div className="row h-100 flex justify-content-center mx-2 mx-md-0">
                                <div className="col-12 col-md-3 card border p-2 " >
                                    <h3 className="h1">${price}</h3>
                                    <div className="card-body">
                                        <h5 className="card-title">Suscripción Plus</h5>
                                        <p className="card-text">Accede a todo el contenido del blog y entérate de todo sin restricciones.  </p>
                                        <p>Con nuestra suscripción, tendrás acceso ilimitado a todas las publicaciones que ofrecemos. Mantente al día con las últimas noticias, consejos útiles, análisis profundos y mucho más, sin limitaciones ni barreras.</p>
                                        <button onClick={handleClick} className="btn btn-primary">Suscribirme</button>
                                        {
                                            preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}


export default Subscribe 

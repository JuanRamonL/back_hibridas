import React from 'react';
import { Link } from 'react-router-dom';
function PaymentResult() {
    // Obtener la url actual
    const url = window.location.href;

    // Separar la url por el signo "?"
    const respuesta = url.split('?');
    // Separar la url por el signo "&"
    const uri = respuesta[1].split('&');
    // Separar la url por el signo "="
    const id =  localStorage.getItem('_id');
    const collection_id = uri[0].split('=')[1];
    const collection_status = uri[1].split('=')[1];
    const payment_id = uri[2].split('=')[1];
    const status = uri[3].split('=')[1];
    const payment_type = uri[4].split('=')[1];
    const merchant_order_id = uri[5].split('=')[1];
    const preference_id = uri[6].split('=')[1];
    const site_id = uri[7].split('=')[1];
    const processing_mode = uri[8].split('=')[1];

    const datosPago = {
        id_user: id,
        collection_id: collection_id,
        collection_status: collection_status,
        payment_id: payment_id,
        status: status,
        payment_type:  payment_type,
        merchant_order_id: merchant_order_id,
        preference_id: preference_id,
        site_id: site_id,
        processing_mode: processing_mode
    }
    /* console.log(datosPago); */


    const datosAguardar = {
        id_user: id,
        payment_id: payment_id
    }
     console.log(datosAguardar); 
   

     const guardarPago = async () => {
        try {
            const response = await fetch('http://localhost:2023/Api/v1/payment/save-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosPago)
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error al guardar el pago:', error);
        }
    } 

    const vincularSuscripcion = async () => {
        try {
            const response = await fetch('http://localhost:2023/Api/v1/payment/vincular-suscripcion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosAguardar)
            });

            const data = await response.json();
            console.log('Datos guardados: ',data);
            localStorage.setItem('suscription', data.suscription);

        } catch (error) {
            console.error('Error al vincular la suscripción:', error);
        }
    }

    guardarPago();

    
    vincularSuscripcion();
   

    return (
        <>
            <div className="container hero-section text-center flex justify-content-center">
                <div className=" text-center align-items-center">
                    <h1>Resultado del pago</h1>
                    <Link to="/home" className="btn btn-primary btn-sm">
                    Volver al inicio
                    </Link>
                </div>
            </div>

        </>
    )
}

export default PaymentResult;

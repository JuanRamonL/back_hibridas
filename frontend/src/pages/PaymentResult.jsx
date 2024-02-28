
function PaymentResult() {
    // Obtener la url actual
    const url = window.location.href;

    // Separar la url por el signo "?"
    const respuesta = url.split('?');
    // Separar la url por el signo "&"
    const uri = respuesta[1].split('&');
    // Separar la url por el signo "="
    const collection_id = uri[0].split('=')[1];
    const collection_status = uri[1].split('=')[1];
    const payment_id = uri[2].split('=')[1];
    const status = uri[3].split('=')[1];
    const payment_type = uri[4].split('=')[1];
    const merchant_order_id = uri[5].split('=')[1];
    const preference_id = uri[6].split('=')[1];
    const site_id = uri[7].split('=')[1];
    const processing_mode = uri[8].split('=')[1];

    const datosAguardar = {
        id_user: localStorage.getItem('_id'),
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
   

    const guardarPago = async () => {
        try {
            const response = await fetch('http://localhost:2023/Api/v1/payment/save-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosAguardar)
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error al guardar el pago:', error);
        }
    } 

    guardarPago();
   

    return (
        <>
            <div>
                <h1>Resultado del pago</h1>
            </div>
        </>
    )
}

export default PaymentResult;

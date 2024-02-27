// Objective: page to show the subscription options.

function Subscribe() {

    return (
        <>
            <div className="container my-md-4">
                <div className="hero-section text-center d-flex align-items-center">
                    <div className="row justify-content-center">

                        <div className="col-12 col-lg-6 mb-4">
                            <div>
                                <h1 className="mb-3 fw-bold"> Únete a nuestra comunidad: Suscríbete al Blog </h1>
                                <p className="h5">Descubre contenido exclusivo, noticias frescas y consejos prácticos directamente en tu bandeja de entrada</p>
                            </div>

                        </div>

                        <div>
                            <div className="row h-100 flex justify-content-center">
                                <div className="col-12 col-md-3 card border p-2" >
                                    <h3 className="h1">$20,00</h3>
                                    <div className="card-body">
                                        <h5 className="card-title">Suscripción Plus</h5>
                                        <p className="card-text">Accede a todo el contenido del blog y entérate de todo sin restricciones.  </p>
                                        <p>Con nuestra suscripción, tendrás acceso ilimitado a todas las publicaciones que ofrecemos. Mantente al día con las últimas noticias, consejos útiles, análisis profundos y mucho más, sin limitaciones ni barreras.</p>
                                        <a href="#" className="btn btn-primary">Suscribirme</a>
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
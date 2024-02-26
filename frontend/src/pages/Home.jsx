import Posts from "../components/blog/Posts"


function Home() {

    return (
        <>
            <div className="container">
                <div className="hero-section text-center d-flex align-items-center">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-6">
                            <h1 className="mb-3 fw-bold">Nuestro Blog</h1>
                            <p >¡Bienvenidos a nuestro rincón digital lleno de inspiración y conocimiento! Prepárate para sumergirte en un viaje de descubrimiento y crecimiento. ¡Gracias por unirte a nuestra comunidad!</p>
                        {
                            localStorage.getItem('contadorNoticias') >= 3 && localStorage.getItem('rol') !== 'admin' && localStorage.getItem('rol') !== 'editor' && localStorage.getItem('suscription') !== "true" ?
                            <>
                                <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                                    <p><strong>Llegaste al maximo de noticias noticias diarias permitidas para Usuarios sin suscripcion.</strong> Si deseas ver más noticias suscribete a un plan</p>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </>
                            :
                            <>
                            </>
                        }
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div className="mb-5">
                    <h2 className="fw-bold mb-4">Posteos recientes</h2>
                    <div className="row g-5">
                        <Posts />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
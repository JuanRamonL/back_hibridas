import Posts from "../components/blog/Posts"
import { Link } from "react-router-dom"


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
                                <div className="alert alert-danger " role="alert">
                                    <div className="d-flex gap-2">
                                        <p>Llegaste al máximo de noticias disponibles diarias permitidas para usuarios sin suscripción <b>(3)</b>. Si deseas ver más noticias, pueder esperar hasta las 00:00hs o también puedes suscribirte a un plan para disfrutar de todo nuestro contenido sin límites diarios.</p>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    <Link  to="/suscribirme">
                                        <p className="btn btn-primary mb-0">Suscribirme</p>
                                    </Link>
                                </div>
                            </>
                            :
                            <>
                            </>
                        }
                        </div>
                    </div>
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
import { Link } from "react-router-dom"
import Posts from "../components/blog/Posts"

function Home() {

    const getRol = localStorage.getItem('rol')

    return (
        <>
            <div className="container">
                <div className="hero-section text-center d-flex align-items-center">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-6">
                            <h1 className="mb-3 fw-bold">Nuestro Blog</h1>
                            <p>¡Bienvenidos a nuestro rincón digital lleno de inspiración y conocimiento! Prepárate para sumergirte en un viaje de descubrimiento y crecimiento. ¡Gracias por unirte a nuestra comunidad!</p>
                        </div>
                    </div>
                </div>
                <div className="mb-5 pb-5">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h2 className="fw-bold">Posteos recientes</h2>
                        {
                            getRol !== 'user' ?
                            <Link to="/post/create" className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                                <i className='bx bx-plus fs-5'></i>
                                Crear Post
                            </Link>
                            : ''
                        }
                    </div>
                    <div className="row g-3">
                        <Posts />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
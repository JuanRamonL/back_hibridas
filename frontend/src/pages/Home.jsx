import Posts from "../components/blog/Posts"

function Home() {

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
                    <h2 className="fw-bold mb-4">Posteos recientes</h2>
                    <div className="row g-3">
                        <Posts />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
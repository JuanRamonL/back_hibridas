function Register() {
    return (
        <div className="container vh d-flex flex-column justify-content-center">
            <h1 className="text-center mb-4">Registrarse</h1>
            <form action="#">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label w-100">
                            <span className="small">Correo electrónico</span>
                            <input type="email" className="form-control mt-1" />
                        </label>
                        <label className="form-label w-100">
                            <span className="small">Contraseña</span>
                            <input type="password" className="form-control mt-1" />
                        </label>
                        <button type="submit" className="btn btn-primary mt-3 py-2 w-100">
                            Unirse
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
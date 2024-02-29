
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Header() {

    const navigate = useNavigate()
    const getToken = localStorage.getItem('token')
    const getRol = localStorage.getItem('rol')
    const getId = localStorage.getItem('_id')

    const handleLogOut = (e) => {
        e.preventDefault()

        fetch("http://localhost:2023/Api/v1/auth/logout", {
            method: 'POST',
        })
        .then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('rol')
            localStorage.removeItem('_id')
            localStorage.removeItem('username')
            localStorage.removeItem('contadorNoticias')
            localStorage.removeItem('suscription')
            localStorage.removeItem('trafficLightSendData')
            localStorage.removeItem('trafficLightBase64')
            localStorage.removeItem('trafficLightWhitelist')
            navigate('/iniciar-sesion')
        })
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-2">
            <div className="container">
                <Link to="/home" className="navbar-brand d-flex align-items-center gap-2">
                    <img src="/favicon.png" className="img-fluid w-25" />
                    <span className="m-0 ff-display h4 fw-bold">Blog</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav gap-4 py-4 p-lg-0 text-center ms-auto align-items-center">
                        <li className="mt-1">
                            <Link to="/home" className="text-primary hover-link">
                                Blog
                            </Link>
                        </li>
                        {
                            getToken && getRol === 'admin' ||  getToken && getRol === 'editor' ?
                                <>
                                    <li className="mt-1">
                                        <Link to="/dashboard/posteos" className="text-primary hover-link">
                                            Mis entradas
                                        </Link>
                                    </li>
                                </>
                            : 
                                <>
                                </>
                        }
                        {
                            getToken && getRol === 'admin' ?
                            <>
                                <li className="mt-1">
                                    <Link to="/dashboard/usuarios" className="text-primary hover-link">
                                        Usuarios
                                    </Link>
                                </li>

                            </>
                        : 
                            <>
                            </>
                        }
                        {
                            !getToken ?
                                <>
                                    <li className="nav-item">
                                        <Link to="/iniciar-sesion" className="btn btn-outline-primary btn-sm">
                                            Iniciar sesión
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/registrarse" className="btn btn-primary btn-sm">
                                            Registrarse
                                        </Link>
                                    </li>
                                </>
                            : 
                                <>
                                    <li className="nav-item mt-1">
                                        <Link to={`/perfil/${getId}`} className="text-primary hover-link">
                                            Mi Perfil
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <form onSubmit={handleLogOut}>
                                            <button type="submit" className="btn btn-primary btn-sm">
                                                Cerrar sesión
                                            </button>
                                        </form>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
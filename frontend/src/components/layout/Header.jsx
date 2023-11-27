
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Header() {

    const navigate = useNavigate()
    const getToken = localStorage.getItem('token')
    
    const handleLogOut = (e) => {
        e.preventDefault()

        fetch("http://localhost:2023/Api/v1/auth/logout", {
            method: 'POST',
        })
        .then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('rol')
            navigate('/iniciar-sesion')
        })
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-2">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <span className="m-0 ff-display h4 fw-bold">Blog</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav gap-3 py-4 p-lg-0 text-center ms-auto">
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
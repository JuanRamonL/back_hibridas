import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const [contenidolocalStorage, setLocalStorage] = useState(localStorage.getItem('username') || '')

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await fetch("http://localhost:2023/Api/v1/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        const res = await response.json()
        console.log(res)

        if (response.ok) {
            localStorage.setItem('_id', res.userid)
            localStorage.setItem('username', res.username)
            localStorage.setItem('rol', res.rol)
            localStorage.setItem('token', res.token)
            localStorage.setItem('contadorNoticias', res.contadorNoticias)
            localStorage.setItem('suscription', res.suscription)
            
            navigate('/')
        } else if(!response.ok && password == '' ) {
            //alert(res.errors[0].msg)
            setErrors(res.errors[0].msg)
        } else if(!response.ok && username == '' ) {
            //alert(res.errors[0].msg)
            setErrors(res.errors[0].msg)
        } else if(!response.ok && username !== res.token && password !== res.token ) {
            //alert(res.Mensaje)
            setErrors(res.Mensaje)
        }
    }

    return (
        <div className="container vh d-flex flex-column justify-content-center">
            <h1 className="text-center mb-4 fw-bold">Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        {
                            errors && 
                            <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                                <i className='bx bx-error-circle'></i>
                                { errors }
                            </div>
                        }
                        <label className="form-label w-100">
                            <span className="small">Nombre de usuario</span>
                            <input
                                type="text"
                                className="form-control mt-1"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </label>
                        <label className="form-label w-100">
                            <span className="small">Contraseña</span>
                            <input
                                type="password"
                                className="form-control mt-1"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </label>
                        <button type="submit" className="btn btn-primary mt-3 py-2 w-100">
                            Ingresar
                        </button>
                    </div>
                </div>
            </form>
            <Link to="/recuperar-contraseña" >
                <p className="text-center small text-secondary mt-5">¿Olvidaste tu contraseña?</p>
            </Link>
        </div>
    )
}

export default Login
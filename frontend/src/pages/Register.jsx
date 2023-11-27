import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await fetch("http://localhost:2023/Api/v1/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })

        console.log(response)
        const res = await response.json()
        console.log(res)
        if (response.ok) {
            navigate('/iniciar-sesion')
        } else if(!response.ok && password == '' ) {
            alert(res.errors[0].msg)
        } else if(!response.ok && username == '' ) {
            alert(res.errors[0].msg)
        } else if(!response.ok && email == '' ) {
            alert(res.errors[0].msg)
        } else if(response.status == 400 ) {
            alert(res.Mensaje)
        }
    }


    return (
        <div className="container vh d-flex flex-column justify-content-center">
            <h1 className="text-center mb-4 fw-bold">Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label w-100">
                            <span className="small">Nombre de usuario</span>
                            <input
                                type="text"
                                className="form-control mt-1"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </label>
                        <label className="form-label w-100">
                            <span className="small">Correo electrónico</span>
                            <input
                                type="email"
                                className="form-control mt-1"
                                onChange={e => setEmail(e.target.value)}
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
                            Unirse
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
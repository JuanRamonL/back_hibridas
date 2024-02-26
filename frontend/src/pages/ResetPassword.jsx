import { set } from "mongoose"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function ResetPassword() {
    const [password, setPassword] = useState('')
    const { id, token } = useParams()
    const[errors, setErrors] = useState(null)
    const[message, setMessage] = useState(null)
    const history = useNavigate() 

    
    //console.log(id, token)

    const user = async() => {
        const response = await fetch(`http://localhost:2023/Api/v1/auth/change-password/${id}/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        console.log(data)
        if(data.estado == 201){
            console.log("Usuario encontrado")
        }else{
            history("*")
        }
    }

    const setval = e => {
        setPassword(e.target.value)
    }

    const sendPassword = async(e) => {
        e.preventDefault()
        if (password == '') {
            setErrors('El campo de contraseña no puede estar vacio.');
        }else{
            const res = await fetch(`http://localhost:2023/Api/v1/auth/change-password/${id}/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password })
            })
            const data = await res.json()
            console.log(data)
            if (data.estado == 201) {
                setPassword('')
                setMessage('Contraseña cambiada correctamente')

                history("/iniciar-sesion")
            } else {
                setErrors('Tiempo expirado, por favor solicita un nuevo enlace para cambiar la contraseña.');
            }
        }
    }

    useEffect(() => {
        user()
    }, [])

    
    return (
        <>
        <div className="container vh d-flex flex-column justify-content-center">
            <h1 className="text-center mb-4 fw-bold">Cambiar contraseña</h1>
            <form >
                <div className="row justify-content-center">
                    
                    <div className="col-12 col-md-6 col-lg-4">
                        {
                            errors && 
                            <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                                <i className='bx bx-error-circle'></i>
                                { errors }
                            </div>
                        }
                        {
                            message && 
                            <div className="alert alert-success d-flex align-items-center gap-2" role="alert">
                                <i className='bx bx-error-circle'></i>
                                { message }
                            </div>
                        }
                        <label className="form-label w-100">
                            <span className="small">Nueva contraseña</span>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Ingresá tu nueva contraseña"
                                value={password}
                                onChange={setval}
                            />
                        </label>
                        <button 
                            type="submit" 
                            className="btn btn-primary mt-3 py-2 w-100"
                            onClick={sendPassword}
                        >
                            enviar
                        </button>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default ResetPassword
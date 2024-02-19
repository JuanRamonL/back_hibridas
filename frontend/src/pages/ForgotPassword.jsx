import { useState } from "react"

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('')
    const [message, setMessage] = useState(''); 

    const setVal = e => {
        setEmail(e.target.value);
    }
    const sendLink = async(e) => {
        e.preventDefault();

        if (email == '') {
            setErrors('El campo de correo electrónico no puede estar vacio.');
        }else{

            const res = await fetch("http://localhost:2023/Api/v1/auth/forgotPassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
    
            });
            
            const data = await res.json();
    
            console.log(data)
            
            
    
            if (data.estado == "201") {
                setEmail('');
                setMessage('Se ha enviado un correo con el enlace para recuperar la contraseña');
            } else {
                setErrors('El correo electrónico no existe en la base de datos.');
            }
        }



        
    }


    
    return (
        <>  
            <div className="container vh d-flex flex-column justify-content-center">
                <h1 className="text-center mb-4 fw-bold">Recuperar contraseña</h1>
                <form >
                    <div className="row justify-content-center">
                        
                        <div className="col-12 col-md-6 col-lg-4">
                            {
                                message && (
                                    <div className="alert alert-primary d-flex align-items-center gap-2" role="alert">
                                        <i className='bi bi-check-circle'></i>
                                        {message}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )
                            }
                            {
                                errors && (
                                    <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                                        <i className='bx bx-error-circle'></i>
                                        {errors}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )
                            }

                            <label className="form-label w-100">
                                <span 
                                    className="small" 
                                    name="email" 
                                >Email</span>
                                <input
                                    type="email"
                                    className="form-control mt-1"
                                    name="email"
                                    value={email}
                                    onChange={setVal}
                                    id="email"
                                />
                            </label>
                            <button 
                                type="submit" 
                                className="btn btn-primary mt-3 py-2 w-100"
                                onClick={sendLink}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword
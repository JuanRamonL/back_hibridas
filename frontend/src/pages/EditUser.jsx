import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'

function EditUser() {

    const navigate = useNavigate();

    const pathname = useLocation()

    const idURL = pathname.pathname.split('/')[2]

    const [data, setData] = useState({
        username: "",
        email: "",
        rol: "",
    });

    const handleUsername = (e) => {
        setData({ ...data, username: e.target.value });
    };

    const handleEmail = (e) => {
        setData({ ...data, email: e.target.value });
    };

    const handleRol = (e) => {
        setData({ ...data, rol: e.target.value })
    };

    useEffect(() => {
        fetch(`http://localhost:2023/Api/v1/users/${idURL}`)
            .then(response => response.json())
            .then(data => setData(data.user))
    }, [idURL])

    const handleSubmitEdit = (e) => {
        e.preventDefault()

        fetch(`http://localhost:2023/Api/v1/users/${idURL}/modificar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("Se editó el usuario")
            navigate("/dashboard/usuarios")
        })
    }

    return (
        <div className="container">
            <h1 className="text-center fw-bold py-5">Editar usuario</h1>
            <form action="#" onSubmit={handleSubmitEdit}>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-9">
                        <label className="form-label w-100">
                            <span className="small">Título</span>
                            <input
                                type="text"
                                className="form-control mt-1"
                                value={data.username}
                                onChange={handleUsername}
                            />
                        </label>
                        <label className="form-label w-100">
                            <span className="small">Correo electrónico</span>
                            <input
                                type="text"
                                className="form-control mt-1"
                                value={data.email}
                                onChange={handleEmail}
                            />
                        </label>
                        <label className="form-label w-100">
                            <span className="small">Rol</span>
                            <input
                                type="text"
                                className="form-control mt-1"
                                value={data.rol}
                                onChange={handleRol}
                            />
                        </label>
                        <button type="submit" className="btn btn-primary mt-3 mb-3 py-2 w-100">
                            Editar Usuario
                        </button>
                        <Link to={'/dashboard/usuarios'} className='btn btn-warning d-flex mb-5 py-2 justify-content-center'>
                            Cancelar
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditUser
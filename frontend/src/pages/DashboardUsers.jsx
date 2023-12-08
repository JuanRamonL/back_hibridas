import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function DashboardUsers() {

    const [users, setUsers] = useState([])

    useEffect(() => {

        fetch("http://localhost:2023/Api/v1/users")
            .then(response => response.json())
            .then(data => {
                setUsers(data.users)
            })
            .catch(error => console.log(error))

    }, [])

    console.log(users);

    return (
        <div className="container">
            <h1 className="text-center fw-bold py-5">Administrar usuarios</h1>
            <div className="row justify-content-center g-5 mb-5 pb-5">
                <table className="table table-bordered w-50">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo electrónico</th>
                            <th>Rol</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => 
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.rol}</td>
                                    <td>
                                        <div className='d-flex justify-content-center'>
                                            <Link to={`/usuario/${user._id}/editar`} className='btn btn-warning btn-sm d-flex py-2'>
                                                <i className='bx bx-edit me-2 fs-5'></i>
                                                Editar Usuario
                                            </Link>
                                        </div>
                                    </td>
                                </tr>    
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DashboardUsers
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Profile() {

    const { id } = useParams()

    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:2023/Api/v1/users/${id}`)
            .then(response => response.json())
            .then(data => setUserData(data.user))
            .catch(error => error)
    }, [id])

    return (
        <div className="container mb-5 py-5">
            <div className="row justify-content-center text-center">
                <div className="col-12 col-lg-9">
                    {
                        <div className="d-flex flex-column align-items-center">
                            <img className="rounded-pill object-fit-cover" width={200} height={200} src={userData.profilePic || '/no-profile-image.png'} alt="" />
                            <h1 className="fw-bold fs-2 mt-3">{ userData.username }</h1>
                            <p>{ userData.email }</p>
                            <Link to={`/perfil/${id}/editar`} className='btn btn-warning btn-sm d-flex py-2'>
                                <i className='bx bx-edit me-2 fs-5'></i>
                                Editar Perfil
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
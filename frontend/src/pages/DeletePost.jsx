import { useNavigate, Link, useLocation } from 'react-router-dom'

function DeletePost() {

    const navigate = useNavigate();

    const pathname = useLocation()

    const idURL = pathname.pathname.split('/')[2]

    console.log(idURL)

    const handleDeletePost = (e) => {
        e.preventDefault();

        fetch(`http://localhost:2023/Api/v1/entradas/${idURL}/eliminar`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(err => err);

        navigate('/dashboard/posteos');
    };

    return (
        <div className="container text-center">
            <h1 className='fw-bold py-5'>¿Estás seguro que deseas eliminar este post?</h1>
            <div className="d-flex justify-content-center gap-3 mb-5">
                <form onSubmit={handleDeletePost} className='d-flex justify-content-center'>
                    <button type='submit' className='btn btn-danger d-flex py-2'>
                        <i className='bx bx-trash me-2 fs-5'></i>
                        Eliminar Post
                    </button>
                </form>
                <Link to={'/dashboard/posteos'} className='btn btn-warning d-flex align-items-center'>
                    Cancelar
                </Link>
            </div>
        </div>
    )
}

export default DeletePost
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

function DetailsPost() {
    const { id } = useParams();

    const [postData, setPostData] = useState({});
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRol = localStorage.getItem('rol');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:2023/Api/v1/entradas/${id}`)
            .then(response => response.json())
            .then(data => setPostData(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (postData.categories && postData.categories.length > 0) {
            // Assuming the first category
            const categoryId = postData.categories[0]?.['_id']; // Acceder al primer elemento del array
            fetch(`http://localhost:2023/Api/v1/categorias/${categoryId}`)
                .then(response => response.json())
                .then(data => setCategoryData(data))
                .catch(error => setError(error));
        }
    }, [postData]);

    console.log(postData)

    const handleDeletePost = (e) => {
        e.preventDefault();

        fetch(`http://localhost:2023/Api/v1/entradas/${id}/eliminar`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(err => err);

        navigate('/');
    };

    const handleEditPost = (e) => {
        e.preventDefault();

        fetch(`http://localhost:2023/Api/v1/entradas/${id}/actualizar`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .catch(err => err);

        navigate(`/post/${id}/edit`);
    };

    return (
        <>
            {error && <span>Mensaje de error</span>}
            {loading && (
                <span>
                    <i className='bx bx-loader-alt bx-spin fs-1'></i>
                </span>
            )}
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-lg-7' key={postData._id}>
                        <img className='img-fluid w-100' src={postData.photo || '/no-image.jpg'} alt='' />
                        <div className='py-4'>
                            <p className='d-flex mb-2 text-primary fw-medium '>
                                <i className='bx bxs-calendar me-2 fs-5'></i>
                                <span>{postData.createdAt?.slice(0, 10)}</span>
                            </p>
                            <h3 className='fw-bold mb-4 mt-3'>{postData.title}</h3>
                            <h3 className='fw-bold mb-4 mt-3'>{categoryData.name}</h3>
                            <div>{parse(`${postData.desc}`)}</div>
                        </div>
                    </div>
                </div>
                {getRol !== 'user' && getRol === 'admin' ? (
                    <>
                        <form onSubmit={handleDeletePost} className='d-flex justify-content-center'>
                            <button type='submit' className='btn btn-danger d-flex py-2'>
                                <i className='bx bx-trash me-2 fs-5'></i>
                                Eliminar Post
                            </button>
                        </form>
                    </>
                ) : (
                    ''
                )}
                {getRol !== 'user' ? (
                    <form onSubmit={handleEditPost} className='d-flex justify-content-center'>
                        <button type='submit' className='btn btn-warning d-flex py-2'>
                            <i className='bx bx-edit me-2 fs-5'></i>
                            Editar Post
                        </button>
                    </form>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}

export default DetailsPost;

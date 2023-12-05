import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

function DetailsPost() {
    const { id } = useParams();

    const [postData, setPostData] = useState({});
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

    const handleDeletePost = (e) => {
        e.preventDefault();

        fetch(`http://localhost:2023/Api/v1/entradas/${id}/eliminar`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(err => err);

        navigate('/');
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
                            <div className='d-flex align-items-center mb-3 gap-2'>
                                <img src="/no-profile-image.png" className='img-fluid ' width={48} alt="" />
                                <span className='fw-medium fst-italic'>{postData.autor?.username}</span>
                            </div>
                            <div className='d-flex align-items-center justify-content-between'>
                                <span className='fw-bold text-primary'>{postData.categories?.name}</span>
                                <span className='fw-bold text-primary'>{postData.createdAt?.slice(0, 10)}</span>
                            </div>
                            <h3 className='fw-bold mb-4 mt-3'>{postData.title}</h3>
                            <div>{parse(`${postData.desc}`)}</div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center gap-3'>
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
                        <div className='d-flex justify-content-center'>
                            <Link to={`/post/${id}/edit`} type='submit' className='btn btn-warning d-flex py-2'>
                                <i className='bx bx-edit me-2 fs-5'></i>
                                Editar Post
                            </Link>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </>
    );
}

export default DetailsPost;

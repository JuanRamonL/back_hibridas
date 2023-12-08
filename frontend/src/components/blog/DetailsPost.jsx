import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

function DetailsPost() {
    const { id } = useParams();

    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:2023/Api/v1/entradas/${id}`)
            .then(response => response.json())
            .then(data => setPostData(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [id]);

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
                                <span className='fw-medium fst-italic'>Publicado por: {postData.autor?.username}</span>
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
            </div>
        </>
    );
}

export default DetailsPost;

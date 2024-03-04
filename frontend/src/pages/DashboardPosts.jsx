import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import parse from 'html-react-parser'

function DashboardPosts() {

    const getId = localStorage.getItem('_id')

    const [data, setData] = useState([])

    const getRol = localStorage.getItem('rol');
    const getUser = localStorage.getItem('username')

    useEffect(() => {

        fetch(`http://localhost:2023/Api/v1/entradas/autor/${getId}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.log(error))

    }, [getId])

    console.log(data)

    return (
        <div className="container">
            <h1 className="text-center fw-bold py-5">Administrar posteos</h1>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="fw-bold">Posteos publicados</h2>
                {
                    getRol !== 'user' ?
                    <div className="d-flex align-items-center gap-2">

                        <Link to="/post/crear" className="btn btn-primary d-flex align-items-center gap-2">
                            <i className='bx bx-plus fs-5'></i>
                            Crear Post manual
                        </Link>

                        <Link to="/post/crearIA" className="btn btn-success d-flex align-items-center gap-2">
                            <i className="bi bi-robot"></i>
                            Crear Post con IA
                        </Link>

                    </div>
                    : ''
                }
            </div>
            <div className="row justify-content-center g-5 mb-5 pb-5">
                {
                    data.map(post => 
                        <div className="col-12" key={post._id}>
                            <div className="row gy-4">
                                <div className="col-12 col-lg-4">
                                    <img className="img-fluid" src={ post.photo || '/no-image.jpg' } />
                                </div>
                                <div className="col-12 col-lg-8">
                                    <h2 className="fw-bold fs-4">{ post.title }</h2>
                                    <div className="text-clamp mb-3">
                                        { parse(post.desc) }
                                    </div>
                                    <div className="d-flex gap-4 flex-wrap">
                                        <div>
                                            <b className="text-primary">Categoría: </b>
                                            { post.categories.name }
                                        </div>
                                        <div>
                                            <b className="text-primary">Autor: </b>
                                            { post.autor.username }
                                        </div>
                                        <div>
                                            <b className="text-primary">Creado el: </b>
                                            { post.createdAt.slice(0, 10) }
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4 justify-content-center justify-content-lg-start mt-4'>

                                        {getRol !== 'user' && post.autor.username == getUser ? (
                                            <>
                                                <div className='d-flex justify-content-center'>
                                                    <Link to={`/post/${post._id}`} className='btn btn-primary d-flex py-2'>
                                                        <i className='bx bx-book me-2 fs-5'></i>
                                                        Ver Post
                                                    </Link>
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <Link to={`/post/${post._id}/editar`} className='btn btn-warning d-flex py-2'>
                                                        <i className='bx bx-edit me-2 fs-5'></i>
                                                        Editar Post
                                                    </Link>
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <Link to={`/post/${post._id}/eliminar`} className='btn btn-danger d-flex py-2'>
                                                        <i className='bx bx-trash me-2 fs-5'></i>
                                                        Eliminar Post
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default DashboardPosts
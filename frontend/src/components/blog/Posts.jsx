import { Link } from "react-router-dom"
import parse from "html-react-parser"
import { useState, useEffect, useRef } from "react"

function Posts() {

    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [endMessage, setEndMessage] = useState('')
    const [contadorDiario, setContadorDiario] = useState(0)

    //Se ejecuta una sola vez, cuando el componente se monta
    useEffect(() => {
        if(localStorage.getItem('contadorNoticias')) {
            setContadorDiario(parseInt(localStorage.getItem('contadorNoticias')))
        }else{
            localStorage.setItem('contadorNoticias', contadorDiario.toString())
        }
    }, [contadorDiario])

    const elementRef = useRef(null)

    function onIntersection(entries) {
        const firstEntry = entries[0]
        if(firstEntry.isIntersecting && hasMore) {
            fetchMoreItems()
        }
    }

    useEffect(() => {

        const observer = new IntersectionObserver(onIntersection)
        if(observer && elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if(observer) {
                observer.disconnect()
            }
        }

    }, [data])

    async function fetchMoreItems() {
        
        const response = await fetch(`http://localhost:2023/Api/v1/entradas`)
        
        const data = await response.json()
        console.log(data)
        if(data.posts.length == 0) {
            setHasMore(false)
            setEndMessage('No hay nada más para cargar 😢')
        } else {
            setData(prevData => [ ...prevData, ...data.posts ])
        }

    }

    return (
        <>
            {
                data.map((post, index) => 
                    <div className="col-12" key={index}>
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-4">
                                <img className="img-fluid w-100" src={post.photo || "/no-image.jpg"} alt="" />
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="py-3">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <small className="d-inline-block fw-bold mb-2 text-primary">{post.categories.name}</small>
                                        <small className="d-inline-block fw-bold mb-2 text-primary">Publicado el: {post.createdAt.slice(0, 10)}</small>
                                    </div>
                                    <h3 className="fs-4 fw-bold title-clamp">{post.title}</h3>
                                    <div className="text-clamp mb-3">
                                        { parse(post.desc) }
                                    </div>
                                    {
                                        localStorage.getItem('contadorNoticias') >= 300  ?
                                        <>
                                        <a href="#" className="btn btn-primary btn-sm disabled" role="button" aria-disabled="true">Seguir leyendo</a>
                                        </>
                                        :
                                        <>
                                        <Link to={`/post/${post._id}`}  className="btn btn-primary btn-sm">
                                            Seguir leyendo
                                        </Link>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {hasMore ?
                <div ref={elementRef} className="d-flex justify-content-center w-100 py-5">
                    <span>
                        <i className='bx bx-loader-alt bx-spin fs-1'></i>
                    </span>
                </div>
                :
                <div className="d-flex justify-content-center">
                    <p>{ endMessage }</p>
                </div>
            }
        </>
    )
}

export default Posts
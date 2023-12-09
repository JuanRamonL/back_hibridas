import { Link } from "react-router-dom"
import parse from "html-react-parser"
import { useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'

function Posts() {

    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(true)

    const fetchMoreData = () => {
        if(data.length < 1) {
            fetch("http://localhost:2023/Api/v1/entradas")
            .then(response => response.json())
            .then(data => setData(data.posts))
        setTimeout(() => {
            setData(data.concat(Array.from()))
        }, 500);
        } else {
            setHasMore(false)
        }

    }

    console.log(data)

    return (
        <>
            {/* {error && <span>Mensaje de error</span>}
            {loading &&
                <div className="d-flex justify-content-center w-100 py-5">
                    <span>
                        <i className='bx bx-loader-alt bx-spin fs-1'></i>
                    </span>
                </div>
            } */}

            <InfiniteScroll
                dataLength={data.length}
                className="row g-5"
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <div className="d-flex justify-content-center w-100 py-5">
                        <span>
                            <i className='bx bx-loader-alt bx-spin fs-1'></i>
                        </span>
                    </div>
                }
                endMessage={<p className="text-center pt-4 fw-bold">No hay más resultados</p>}
            >
                {data.map((post) =>
                    <div className="col-12" key={post._id}>
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
                                    <Link to={`/post/${post._id}`} className="btn btn-primary btn-sm">
                                        Seguir leyendo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </InfiniteScroll>
        </>
    )
}

export default Posts
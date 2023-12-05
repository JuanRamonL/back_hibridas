import { Link } from "react-router-dom"
import { useFetch } from "../../useFetch"
import parse from "html-react-parser"

function Posts() {

    const { data, loading, error } = useFetch(
        "http://localhost:2023/Api/v1/entradas"
    )

    return (
        <>
            {error && <span>Mensaje de error</span>}
            {loading &&
                <div className="d-flex justify-content-center w-100 py-5">
                    <span>
                        <i className='bx bx-loader-alt bx-spin fs-1'></i>
                    </span>
                </div>
            }
            {data?.posts.map((post) =>
                <div className="col-12 col-md-6 col-lg-4" key={post._id}>
                    <img className="img-fluid" src={post.photo || "/no-image.jpg"} alt="" />
                    <div className="py-3">
                        <div className='d-flex align-items-center justify-content-between'>
                            <small className="d-inline-block fw-bold mb-1 text-primary">{post.categories.name}</small>
                            <small className="d-inline-block fw-bold mb-1 text-primary">{post.createdAt.slice(0, 10)}</small>
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
            )}
        </>
    )
}

export default Posts
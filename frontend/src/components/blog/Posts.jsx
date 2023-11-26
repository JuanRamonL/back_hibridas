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
                <span>
                    <i className='bx bx-loader-alt bx-spin fs-1'></i>
                </span>
            }
            {data?.posts.map((post) =>
                <div className="col-12 col-md-6 col-lg-4" key={post._id}>
                    <img className="img-fluid" src={post.photo || "/no-image.jpg"} alt="" />
                    <div className="py-4">
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
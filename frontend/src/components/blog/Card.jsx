import { Link } from "react-router-dom"

function Card() {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <img className="img-fluid" src="/post-img.jpg" alt="" />
            <div className="py-4">
                <h3 className="fs-4 fw-bold title-clamp">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum reprehenderit, veritatis, quos error officia sed iusto nisi odio ab quaerat aspernatur ullam. Natus, at eius!</h3>
                <p className="text-clamp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis officiis quos harum at, qui laborum sapiente molestiae veniam dolore voluptates excepturi nesciunt non dignissimos perspiciatis consectetur aut id, ad accusantium ea, sit quae rerum laudantium.</p>
                <Link to="/post" className="btn btn-primary btn-sm ">
                    Seguir leyendo
                </Link>
            </div>
        </div>
    )
}

export default Card
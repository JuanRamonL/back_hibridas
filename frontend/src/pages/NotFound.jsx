import { useRouteError } from "react-router-dom";

function NotFound() {

    const error = useRouteError()
    console.error(error)

    return (
        <div className="container">
            <div className="row justify-content-center text-center">
                <div className="col-12 col-lg-9">
                    <h1 className="fw-bold my-5">404 - No se ha encontrado la página</h1>
                </div>
            </div>
        </div>
    )

}

export default NotFound
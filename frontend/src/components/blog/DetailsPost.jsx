import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import parse from "html-react-parser"

function DetailsPost() {

    const { id } = useParams()
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:2023/Api/v1/entradas/${id}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [id])


    return (
        <>
            {error && <span>Mensaje de error</span>}
            {loading &&
                <span>
                    <i className='bx bx-loader-alt bx-spin fs-1'></i>
                </span>
            }
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-7" key={data._id}>
                        <img className="img-fluid w-100" src={data.photo || "/no-image.jpg"} alt="" />
                        <div className="py-4">
                            <small className="d-block mb-2 text-primary fw-medium ">
                                <i className="bx bxs-calendar me-2"></i>
                                <span>{data.createdAt?.slice(0,10)}</span>
                            </small>
                            <h3 className="fw-bold mb-4 mt-3">{data.title}</h3>
                            <div>
                                { parse(`${data.desc}`) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsPost
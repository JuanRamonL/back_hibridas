import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import JoditEditor from 'jodit-react'

function EditPost() {

    const { id } = useParams()

    const [data, setData] = useState({
        title: "",
        desc: "",
        photo: "",
    });

    const handleTitle = (e) => {
        setData({ ...data, title: e.target.value });
    };

    const handleDesc = (value) => {
        setData({ ...data, desc: value });
    };

    const handlePhoto = (e) => {
        setData({ ...data, photo: e.target.value })
    };

    const navigate = useNavigate()

    const editor = useRef(null)
    const config = {
        placeholder: "Descripción del post"
    }

    useEffect(() => {
        fetch(`http://localhost:2023/Api/v1/entradas/${id}`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [id])

    const handleSubmitEdit = (e) => {
        e.preventDefault()

        fetch(`http://localhost:2023/Api/v1/entradas/${id}/actualizar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("Se editó el post")
            console.log(data);
            navigate("/")
        })
    }

    return (
        <>
            <div className="container create-post-section">
                <h1 className="text-center py-5 fw-bold">Editar Post</h1>
                <form action="#" onSubmit={handleSubmitEdit}>
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-9">
                            <label className="form-label w-100">
                                <span className="small">Título</span>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    value={data.title}
                                    onChange={handleTitle}
                                />
                            </label>
                            <label className="form-label w-100">
                                <span className="small">Descripción</span>
                                <JoditEditor
                                    ref={editor}
                                    value={data.desc}
                                    config={config}
                                    onChange={handleDesc}
                                />
                            </label>
                            <label className="form-label w-100">
                                <span className="small">Imagen de Portada (URL)</span>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    value={data.photo}
                                    onChange={handlePhoto}
                                />
                            </label>
                            <button type="submit" className="btn btn-primary mt-3 mb-5 py-2 w-100">
                                Editar Post
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditPost
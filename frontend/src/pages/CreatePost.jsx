import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import JoditEditor from 'jodit-react'

function CreatePost() {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const editor = useRef(null)
    const config = {
        placeholder: "Descripción del post"
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newPost = { title, desc, photo }

        setLoading(true)

        fetch("http://localhost:2023/Api/v1/entradas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        }).then(() => {
            console.log("Se agrego el nuevo post")
            setLoading(false)
            setMessage("Se agrego un nuevo post")
            navigate("/")
        }).catch(() => {
            setMessage("No se pudo crear el post")
        })
    }

    return (
        <>
            <div className="container create-post-section">
                <h1 className="text-center py-5 fw-bold">Crear Post</h1>
                <form action="#" onSubmit={handleSubmit} method="POST">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-9">
                            <label className="form-label w-100">
                                <span className="small">Título</span>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="form-label w-100">
                                <span className="small">Descripción</span>
                                {/* <textarea
                                    type="text"
                                    className="form-control mt-1"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    required
                                /> */}
                                <JoditEditor
                                    ref={editor}
                                    value={desc}
                                    config={config}
                                    onChange={newContent => setDesc(newContent)}
                                    required
                                />
                            </label>
                            <label className="form-label w-100">
                                <span className="small">Imagen de Portada (URL)</span>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    value={photo}
                                    onChange={(e) => setPhoto(e.target.value)}
                                />
                            </label>
                            { 
                                !loading &&
                                    <button type="submit" className="btn btn-primary mt-3 py-2 w-100">
                                        Crear Post
                                    </button>
                            }
                            {
                                loading && 
                                <button type="submit" className="btn btn-primary mt-3 py-2 w-100">
                                    Creando Post
                                </button>
                            }

                            <div className="text-center mt-3 mb-5">
                                {
                                    message
                                        ? <p className="alert alert-danger">{message}</p>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePost
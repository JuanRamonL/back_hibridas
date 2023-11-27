import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import JoditEditor from 'jodit-react'

function CreatePost() {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const [categories, setCategories] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const editor = useRef(null)
    const config = {
        placeholder: "Descripción del post"
    }

    const handleDesc = (e) => {
        setDesc(e)
    }

    useEffect(() => {
        fetch("http://localhost:2023/Api/v1/categorias")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newPost = { title, desc, photo, categories: selectedCategory }

        setLoading(true)

        fetch("http://localhost:2023/Api/v1/entradas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        }).then(() => {
            console.log("Se agrego el nuevo post")
            setLoading(false)
            console.log(newPost);
            navigate("/")
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
                                <JoditEditor
                                    ref={editor}
                                    value={desc}
                                    config={config}
                                    onChange={handleDesc}
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
                            <label className="form-label w-100 mt-3">
                                <span className="small me-2">Seleccionar Categoria</span>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Seleccione una categoría
                                    </option>
                                    {categories.categorias?.map((cat) => (
                                        <option value={cat._id} key={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
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

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePost